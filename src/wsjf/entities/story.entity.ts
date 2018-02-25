import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { Planning } from "./planning.entity";

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  businessValue: number;

  @Column({ default: 0})
  timeCriticallity: number;

  @Column({ default: 0 })
  riskOpportunity: number;

  @Column({ default: 0 })
  jobSize: number;

  @ManyToOne(type => Planning, planning => planning.stories)
  planning: Planning;

  @CreateDateColumn()
  created: Date;
}