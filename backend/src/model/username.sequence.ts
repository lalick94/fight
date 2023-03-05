import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class UsernameSequence {
    @PrimaryColumn()
    public id!: string;
    @Column({ type: 'int' })
    public seq_value: number;
}