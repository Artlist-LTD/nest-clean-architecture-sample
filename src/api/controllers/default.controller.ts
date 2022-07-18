
import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiBearerAuth()
@ApiTags("default")
@Controller({ path: "/" })
export class DefaultController {
  @Get()
  default(@Res() response: Response) {
    // Endpoint is used by health check monitor
    return response.status(HttpStatus.OK).send();
  }

  @Get("/health")
  health(@Res() response: Response) {
    // Endpoint is used by health check monitor
    return response.status(HttpStatus.OK).send();
  }
}
