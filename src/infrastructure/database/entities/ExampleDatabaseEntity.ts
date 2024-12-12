import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import 'reflect-metadata';

@Entity('example')
export class ExampleDatabaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = '';

    @Column({ type: 'varchar', length: 255 })
    name: string = '';

    @Column({ type: 'varchar', length: 255 })
    description: string = '';

    @CreateDateColumn()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt: Date = new Date();
}