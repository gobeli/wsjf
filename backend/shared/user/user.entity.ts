import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Planning } from "../../wsjf/entities/planning.entity";
import * as bcrypt from 'bcryptjs';

@Entity()
export default class User {
  constructor(fields: { email: string, password: string }) {
		if (fields) Object.assign(this, fields);
		// if the user is inserted or updated, hash the password
		if (fields && fields.email && fields.password) {
			this.hashPassword(this.password);
		}
	}

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  displayName:string;

	@Column()
  password: string;

  @Column()
  googleId: string;

  @Column()
  googleToken: string;

  @OneToMany(type => Planning, planning => planning.user, {
		cascadeInsert: true,
		cascadeUpdate: true
  })
  plannings: Planning[];

  hashPassword(password) {
		this.password = bcrypt.hashSync(password, 10);
  }

	validatePassword(plainTextPassword: string) {
		return bcrypt.compareSync(plainTextPassword, this.password)
	}
}