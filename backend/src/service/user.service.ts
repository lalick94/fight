import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {EntityManager, In, Repository} from 'typeorm';
import {User} from "../model/User";
import {ILoginRequestDto} from "../interfaces/ILoginRequestDto";
import {IAnswerQuestionRequestDto} from "../interfaces/IAnswerQuestionRequestDto";
import {QuizAnswer} from "../model/QuizAnswer";
import {UserAnswer} from "../model/UserAnswer";
import {ILoginResponseDto} from "../interfaces/ILoginResponseDto";
import {JwtService} from "./jwt.service";
import {QuestionType} from "../model/QuestionType";
import {IJwtToken} from "../interfaces/IJwtToken";
import {ContextService} from "./context.service";

const crypto = require('crypto');

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;
    @InjectRepository(QuizAnswer)
    private readonly answerRepository: Repository<QuizAnswer>;
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>;
    @InjectEntityManager()
    private readonly entityManager: EntityManager;

    constructor(private jwtService: JwtService,
                private contextService: ContextService) {
    }

    public createUser(body: any): Promise<User> {
        const user: User = new User();

        user.username = body.username;
        user.password = body.password;

        return this.repository.save(user);
    }

    public async login(req: ILoginRequestDto): Promise<ILoginResponseDto>{
        const user: User = await this.repository.findOne({where: {username: req.username}})
        if(!user){
            throw new NotFoundException("User not found");
        }
        let hash = crypto.createHash('md5').update(req.password).digest("hex");
        if(hash !== user.password) {
            throw new BadRequestException("Password wrong");
        }

        user.lastLogin = new Date();
        this.repository.save(user);
        return {
            token: this.jwtService.signJwtToken(user.id, user.username),
        };
    }

    async answerQuestion(req: IAnswerQuestionRequestDto) {
        const user: User = await this.repository.findOne({where: {id: req.userId}});
        const answers: QuizAnswer[] = await this.answerRepository.findBy({id: In(req.answerId) });
        const allAnswers: UserAnswer[] = [];
        for(const a of answers) {
            const userAnswer = new UserAnswer();
            userAnswer.user = user;
            userAnswer.quizAnswer = a;
            userAnswer.custom_answer = req.customAnswer;
            allAnswers.push(userAnswer);
        }
        await this.userAnswerRepository.save(allAnswers);
        return Promise.resolve(undefined);
    }

    async getScore() {
        const token: IJwtToken = this.contextService.getKey("token");
        const user: User = await this.repository.findOne({where: {id: token.userId}});
        let userAnswers: UserAnswer[] = await this.userAnswerRepository.find({relations: {quizAnswer: true, user: true}});
        userAnswers = userAnswers.filter(u => u.user.id === token.userId);
        const quizAnswers: QuizAnswer[] = await this.answerRepository.find({where: {id: In(userAnswers.map(u => u.quizAnswer.id))}, relations:{quizQuestion: true}});
        const resp = {};
        const result1 = await this.entityManager.query(`SELECT DISTINCT module_category, question_category FROM quiz_question`, []);
        const questionCount = await this.entityManager.query(`SELECT COUNT(*), module_category, question_category FROM quiz_question GROUP BY module_category, question_category`, []);
        quizAnswers.forEach(q => {
            if(!resp[q.quizQuestion.module_category]){
                resp[q.quizQuestion.module_category] = {};
            }
            if(!resp[q.quizQuestion.module_category][q.quizQuestion.question_category]){
                resp[q.quizQuestion.module_category][q.quizQuestion.question_category] = 0;
            }
            if(q.quizQuestion.type === QuestionType.MC){
                if(q.isCorrect){
                    resp[q.quizQuestion.module_category][q.quizQuestion.question_category]++;
                }
            } else {
                resp[q.quizQuestion.module_category][q.quizQuestion.question_category]++;
            }
        });
        result1.forEach(r => {
           if(!resp[r.module_category]){
                resp[r.module_category] = {};
           }
           if(!resp[r.module_category][r.question_category]){
               resp[r.module_category][r.question_category] = 0;
           }
        });

        for (let moduleKey of Object.keys(resp)) {
            for(let questionKey of Object.keys(resp[moduleKey])){
                const count = questionCount.find(q => q.module_category === moduleKey && q.question_category === questionKey);
                resp[moduleKey][questionKey] = resp[moduleKey][questionKey] + " of " + count.count;
            }
        }

        return resp;
    }

    async logout() {
        const token: IJwtToken = this.contextService.getKey("token");
        console.log(token);
        const user: User = await this.repository.findOne({where: {id: token.userId}});

        user.lastLogout = new Date();
        this.repository.save(user);
    }
}