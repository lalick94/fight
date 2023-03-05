import {Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuizQuestion} from "./QuizQuestion";
import {User} from "./User";
import {QuizAnswer} from "./QuizAnswer";

@Entity()
export class UserAnswer {
    @PrimaryGeneratedColumn()
    public id?: number;
    @Column({ type: 'varchar', length: 2000, nullable: true })
    public custom_answer: string;
    @ManyToOne(() => QuizAnswer, (quizAnswer) => quizAnswer.userAnswers)
    public quizAnswer: QuizAnswer;
    @ManyToOne(() => User, (user) => user.userAnswers)
    public user: User;
}