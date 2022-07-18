import { IARepository } from "@app/domain/interfaces/a.interface";
import { IBRepository } from "@app/domain/interfaces/b.interface";
import { A } from "@app/domain/models/a";
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from "@nestjs/common";

@Injectable()
export class BUseCase {
  constructor(
    private readonly bRepository: IBRepository,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}


  async get(
    x: string,
    y: string
  ): Promise<A> {
    return await this.bRepository.myBusinessFunction1();
  }
}
