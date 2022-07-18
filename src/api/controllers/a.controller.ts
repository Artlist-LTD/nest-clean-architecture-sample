import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseInterceptors,
  Get,
  Query,
  ParseUUIDPipe,
  Inject,
  Logger,
  LoggerService,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "@app/api/decorators/roles.decorator";
import { Role } from "@app/domain/enums/role.enum";
import { enumExample } from "../common/enums";
import { ExampleInterceptor } from "../interceptors/example.interceptor";
import { AUseCase } from "@app/usecases/a.usecases";

@ApiBearerAuth()
@ApiTags("a")
@Controller({ path: "a", version: "1" })
export class AController {
  constructor(
    private readonly aUseCase: AUseCase,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  @Post("inviteMembers")
  @ApiHeader({
    name: enumExample.X,
    description: "x",
    required: true,
  })
  @ApiHeader({
    name: enumExample.Y,
    description: "y",
    required: true,
  })
  @UseInterceptors(
    ExampleInterceptor
  )
  @ApiOperation({ summary: "example" })
  @ApiResponse({ status: 202, description: "Accepted." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 500, description: "Server error." })
  @Roles(Role.Admin)
  async example(
    @Res() response: Response
  ) {
    try {
      // call use case.
      response.status(HttpStatus.ACCEPTED).send();
    } catch (error) {
    }
  }
}
