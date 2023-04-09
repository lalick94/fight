import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuizAnswer} from "./QuizAnswer";
import {QuestionCategory} from "./QuestionCategory";
import {ModuleCategory} from "./ModuleCategory";
import {QuestionType} from "./QuestionType";

@Entity()
export class QuizQuestion {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column({type: 'varchar', length: 500, nullable: true})
    public question?: string;
    @Column({type: 'varchar', length: 5000, nullable: true})
    public explanation?: string;
    @Column({type: 'varchar', length: 5000, nullable: true})
    public instruction?: string;
    @Column({type: 'varchar', length: 5000, nullable: true})
    public info?: string;
    @Column({type: 'varchar', length: 5000, nullable: true})
    public question_category: QuestionCategory;
    @Column({type: 'varchar', length: 5000, nullable: true})
    public module_category: ModuleCategory;
    @Column({type: 'varchar', length: 500, default: QuestionType.MC})
    public type: QuestionType;
    @Column({type: 'varchar', length: 500, nullable: true})
    public instruction_image?: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    public question_image?: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    public left_slider?: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    public drag_drop_true?: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    public drag_drop_false?: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    public right_slider?: string;
    @OneToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.parent)
    public children: QuizQuestion[];
    @ManyToOne(() => QuizQuestion, (quizQuestion) => quizQuestion.children)
    public parent: QuizQuestion;
    @OneToMany(() => QuizAnswer, (quizAnswer) => quizAnswer.quizQuestion)
    public answers: QuizAnswer[];
}