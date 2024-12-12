import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import "reflect-metadata";

@Entity("example")
export class ExampleDatabaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id = "";

  @Column({ type: "varchar", length: 255 })
  name = "";

  @Column({ type: "varchar", length: 255 })
  description = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
