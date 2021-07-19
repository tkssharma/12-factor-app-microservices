import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";

export class CreateNoteDto {
  @ApiProperty({ description: 'text', required: true })
  @IsString()
	public text!: string;

  @ApiProperty({ description: 'is_completed', required: true })
  @IsBoolean()
  public is_completed!: boolean;
}


export class GetNoteById  {

  @ApiProperty({ description: 'UUID', required: true })
  @IsUUID()
  public id!: string;
}