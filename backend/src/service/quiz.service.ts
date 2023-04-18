import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {User} from "../model/User";
import {ILoginRequestDto} from "../interfaces/ILoginRequestDto";
import * as bcrypt from 'bcrypt';
import {QuizQuestion} from "../model/QuizQuestion";
import {ICheckAnswerRequestDto, ICheckAnswerResponseDto, IQuestionResponseDto} from "../interfaces/quiz.interface";
import {QuizAnswer} from "../model/QuizAnswer";
import {QuestionCategory} from "../model/QuestionCategory";
import {ModuleCategory} from "../model/ModuleCategory";
import {UserAnswer} from "../model/UserAnswer";
import {IUserAnswerResponseDto} from "../interfaces/IUserAnswerResponseDto";
import {IJwtToken} from "../interfaces/IJwtToken";
import {QuestionType} from "../model/QuestionType";
import {ContextService} from "./context.service";

@Injectable()
export class QuizService {
    @InjectRepository(QuizQuestion)
    private readonly repository: Repository<QuizQuestion>;
    @InjectRepository(QuizAnswer)
    private readonly answerRepository: Repository<QuizAnswer>;
    @InjectRepository(UserAnswer)
    private readonly  userAnswerRepository: Repository<UserAnswer>;
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    constructor(private contextService: ContextService) {
    }

    public async getQuestions(question_category?: QuestionCategory, module_category?: ModuleCategory ): Promise<IQuestionResponseDto[]> {
        const questions: QuizQuestion[] = await this.repository.find({ where: { question_category, module_category }, relations: { answers: true, parent: true }, order: { id: 'ASC'}});
        console.log(questions);
        return questions.map(q => {
            return {
                id: q.id,
                question: q.question,
                instruction: q.instruction,
                explanation: q.explanation,
                info: q.info,
                drag_drop_false: q.drag_drop_false,
                drag_drop_true: q.drag_drop_true,
                instruction_image: q.instruction_image,
                question_image: q.question_image,
                left_slider: q.left_slider,
                right_slider:q.right_slider,
                type: q.type,
                question_category: q.question_category,
                module_category: q.module_category,
                dependingQuestionId: q.parent?.id,
                answers: q.answers.map(a => ({
                    id: a.id,
                    answer: a.answer,
                    image: a.image
                })),
            };
        });
    }

    public async checkAnswer(req: ICheckAnswerRequestDto): Promise<ICheckAnswerResponseDto> {
        const token: IJwtToken = this.contextService.getKey("token");
        console.log(token);
        const user: User = await this.userRepository.findOneBy({id: token.userId});
        const question: QuizQuestion = await this.repository.findOne({ where: { id: req.questionId}, relations:{answers: true}});
        if(!question){
            throw new NotFoundException("Question not found");
        }
        let userAnswer = await this.userAnswerRepository.findOne({where: {quizAnswer: {id: In(question.answers.map(a => a.id))}, user}, relations: {quizAnswer: true, user: true}});
        const quizAnswer: QuizAnswer = question.answers.find(a => a.id === req.answerId);
        if(!userAnswer || (question.type === QuestionType.DRAG_DROP && userAnswer.quizAnswer.id !== req.answerId )) {
            userAnswer = {
                quizAnswer,
                user,
                custom_answer: req.customAnswer,
            }
        } else {
            userAnswer.custom_answer = req.customAnswer;
            userAnswer.quizAnswer = quizAnswer;
        }
        await this.userAnswerRepository.save(userAnswer);
        if(question.type === QuestionType.INPUT_FIELD) {
            return {};
        } else if (question.type === QuestionType.MC || question.type === QuestionType.DRAG_DROP_2) {
            return {
                result: question.answers.some(a => a.id === req.answerId && a.isCorrect),
                answers: question.answers.filter(a => a.isCorrect).map(a => a.id),
            };
        }
    }

    async getCustomAnswer(questionId: number): Promise<IUserAnswerResponseDto> {
        const token: IJwtToken = this.contextService.getKey("token");
        const question: QuizQuestion = await this.repository.findOne({ where: {id: questionId}, relations: {answers: true} });
        const user: User = await this.userRepository.findOneBy({id: token.userId});
        console.log(question.answers);
        const answers: UserAnswer[] = await this.userAnswerRepository.find({ where: { quizAnswer: {id: In(question.answers.map(a => a.id))}, user: { id: user.id }}, relations: {quizAnswer: true}});
        console.log(answers);
        return {
            userAnswerId: answers[answers.length - 1].id,
            userAnswer: answers[answers.length - 1].custom_answer,
            image: answers[answers.length - 1].quizAnswer.image
        };
    }

    async getAnsweredQuestions(question_category: QuestionCategory) {
        const token: IJwtToken = this.contextService.getKey("token");
        const questions: QuizQuestion[] = await this.repository.find({ where: { question_category }, relations: { answers: true, parent: true }, order: { id: 'ASC'}});
        const result = [];
        const user: User = await this.userRepository.findOneBy({id: token.userId});
        for(let question of questions) {
            const answer: UserAnswer = await this.userAnswerRepository.findOne({
                where: {
                    quizAnswer: {id: In(question.answers.map(a => a.id))},
                    user: {id: user.id}
                }, relations: {quizAnswer: true}
            });
            if(answer?.quizAnswer?.isCorrect){
                result.push(question);
            }
        }

        return result;
    }
}
