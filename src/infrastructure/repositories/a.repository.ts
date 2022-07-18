import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { AEntity } from "../entities/a.entity";
import { IARepository } from "@app/domain/interfaces/a.interface";
import { A } from "@app/domain/models/a";

@Injectable()
export class ARepository implements IARepository {
  constructor(
    @InjectRepository(AEntity)
    private readonly teamEntityRepository: Repository<AEntity>
  ) { }

  async myBusinessFunction1(): Promise<A> {
    return null;
  }

  async myBusinessFunction2(): Promise<A> {
    const query = this.teamEntityRepository
      .createQueryBuilder("A")
      .select([
        'A.id AS "id"',
        'A.x AS "x"',
      ])
      .where("A.id = :parentId", { parentId: 1 });

    const a = await query.getRawOne();

    return instanceToPlain(a) as A;
  }
}
