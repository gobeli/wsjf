import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class Session implements ISession {
  @Index()
  @Column("bigint")
  public expiredAt: number;

  @PrimaryColumn("varchar", { length: 255 })
  public id: string;

  @Column("text")
  public json: string;
}