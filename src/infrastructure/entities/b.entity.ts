import { B } from "@app/domain/models/b";
import { CustomBaseEntity } from "@app/infrastructure/common/custom.base.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  Generated,
  Entity,
  Unique,
} from "typeorm";

// Bs.entity.ts
@Entity("Bs")
@Unique(["applicationName", "subscriptionId"])
export class BEntity extends CustomBaseEntity<B> implements B {
  constructor(model?: Partial<B>) {
    super();
    Object.assign(this, model);
  }

  @PrimaryGeneratedColumn()
  myBusinessVar1: string;

  @Column()
  @Generated("uuid")
  myBusinessVar2: string;
}
