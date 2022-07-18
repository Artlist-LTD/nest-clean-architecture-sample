import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class ARequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID("4")
  uuid: string;
}
