import {
	Get,
	Post,
	Controller,
	HttpCode,
	HttpStatus,
	Body,
	Req,
	Param,
	ParamData,
	Patch,
	Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import NoteService  from '../services/note.service';
import { CreateNoteDto, GetNoteById } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/notes')
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@Post()
  @ApiTags('notes')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
	async saveNote(@Body() dto: CreateNoteDto) {
		return await this.noteService.saveNote(dto);
	}

  @ApiTags('notes')
  @Get('/')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	async getAllNote() {
		return await this.noteService.findAllNotes({});
	}

  @ApiTags('notes')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	@Get('/:id')
	async getNoteById(@Param() dto: GetNoteById) {
		return await this.noteService.findOneNote({
			where: {
				id: dto.id,
			},
		});
	}

  @ApiTags('notes')
  @ApiOperation({ description: 'Get All categories or sub-categories' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	@Patch('/:id')
	async updateNoteById(
		@Param() param: GetNoteById,
		@Body() dto: UpdateNoteDto,
	) {
		return await this.noteService.updateNote(param.id, dto);
	}

  @ApiTags('notes')
  @ApiOperation({ description: 'delete notes' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
	@Delete('/:id')
	async deleteNoteById(@Param() param: GetNoteById,) {
		return await this.noteService.deleteNote(param.id);
	}
}