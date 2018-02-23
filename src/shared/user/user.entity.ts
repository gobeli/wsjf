import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IUserModel } from "./user.model";
import { Planning } from "../../wsjf/entities/planning.entity";

@Entity()
export default class User implements IUserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() 
  created: Date;
  
  @Column()
  displayName: string;

  @Column()
  googleId: string;

  @Column()
  googleToken: string;

  @OneToMany(type => Planning, planning => planning.user, {
		cascadeInsert: true,
		cascadeUpdate: true
  })
  plannings: Planning[];
}