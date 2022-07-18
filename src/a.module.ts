import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AController } from "./api/controllers/A.controller";
import { IARepository } from "./domain/interfaces/a.interface";
import { TypeOrmConfigModule } from "./infrastructure/config/typeorm/typeorm.module";
import { AEntity } from "./infrastructure/entities/a.entity";
import { ARepository } from "./infrastructure/repositories/a.repository";
import { AUseCase } from "./usecases/a.usecases";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([AEntity]),
  ],
  controllers: [AController],
  providers: [
    { provide: IARepository, useClass: ARepository },
    AUseCase,
    Logger
  ],
})
export class AModule { }
