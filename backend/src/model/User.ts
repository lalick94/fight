import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuizAnswer} from "./QuizAnswer";
import {UserAnswer} from "./UserAnswer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column({ type: 'varchar', length: 120, unique: true })
    public username: string;
    @Column({ type: 'varchar', length: 120 })
    public password: string;
    @CreateDateColumn({ nullable: true })
    public lastLogin: Date;
    @CreateDateColumn({ nullable: true })
    public lastLogout: Date;
    @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizAnswer)
    public userAnswers: UserAnswer[];
}