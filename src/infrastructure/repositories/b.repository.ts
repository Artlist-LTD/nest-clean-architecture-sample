import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { AEntity } from "../entities/a.entity";
import { IARepository } from "@app/domain/interfaces/a.interface";
import { BEntity } from "../entities/b.entity";
import { IBRepository } from "@app/domain/interfaces/b.interface";
import { B } from "@app/domain/models/b";

@Injectable()
export class BRepository implements IBRepository {
  constructor(
    @InjectRepository(BEntity)
    private readonly teamEntityRepository: Repository<BEntity>
  ) { }

  async myBusinessFunction1(): Promise<B> {
    return null;
  }

  async myBusinessFunction2(): Promise<B> {
    const query = this.teamEntityRepository
      .createQueryBuilder("A")
      .select([
        'A.id AS "id"',
        'A.x AS "x"',
      ])
      .where("A.id = :parentId", { parentId: 1 });

    const a = await query.getRawOne();

    return instanceToPlain(a) as B;
  }
}
