import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Story } from "./story.entity";
import User from "../../shared/user/user.entity";

@Entity()
export class Planning {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @OneToMany(type => Story, story => story.planning, {
		cascadeInsert: true,
		cascadeUpdate: true
  })
  stories: Story[];

  @ManyToOne(type => User, user => user.plannings)
  user: User; 

  @CreateDateColumn() 
  created: Date;
}