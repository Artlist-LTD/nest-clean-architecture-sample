
import { A } from "@app/domain/models/a";
import { CustomBaseEntity } from "@app/infrastructure/common/custom.base.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  Generated,
  OneToMany,
  ManyToOne,
  Entity,
  UpdateDateColumn,
} from "typeorm";

// members.entity.ts
@Entity("A")
export class AEntity extends CustomBaseEntity<A> implements A {
  constructor(model?: Partial<A>) {
    super();
    Object.assign(this, model);
  }
  @PrimaryGeneratedColumn()
  myBusinessVar1: string;

  @Column()
  @Generated("uuid")
  myBusinessVar2: string;

}
