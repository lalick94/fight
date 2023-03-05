import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuizQuestion} from "./QuizQuestion";
import {User} from "./User";
import {UserAnswer} from "./UserAnswer";

@Entity()
export class QuizAnswer {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column({ type: 'varchar', length: 2000 })
    public answer: string;
    @Column({type: 'boolean'})
    public isCorrect: boolean;
    @ManyToOne(() => QuizQuestion, (quizQuestion) => quizQuestion.answers)
    public quizQuestion: QuizQuestion;
    @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAnswer)
    public userAnswers: UserAnswer[];
    @Column({type: 'varchar', length: 500, nullable: true})
    public image?: string;
}