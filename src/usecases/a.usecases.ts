import { IARepository } from "@app/domain/interfaces/a.interface";
import { A } from "@app/domain/models/a";
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from "@nestjs/common";

@Injectable()
export class AUseCase {
  constructor(
    private readonly aRepository: IARepository,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}


  async get(
    x: string,
    y: string
  ): Promise<A> {
    return await this.aRepository.myBusinessFunction1();
  }
}
