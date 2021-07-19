import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";


export class UpdateNoteDto {
  @ApiProperty({ description: 'text', required: true })
  @IsString()
	public text!: string;

  @ApiProperty({ description: 'is_completed', required: false })
	public is_completed!: boolean;
}
