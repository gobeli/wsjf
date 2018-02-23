import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { Planning } from "./planning.entity";

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  businessValue: number;
  
  @Column()
  timeCriticallity: number;

  @Column()
  riskOpportunity: number;

  @Column()
  jobSize: number;

  @ManyToOne(type => Planning, planning => planning.stories)
  planning: Planning;

  @CreateDateColumn() 
  created: Date;
}