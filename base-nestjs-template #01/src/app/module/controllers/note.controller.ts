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
} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';
import { NoteService } from '../services/note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @HttpCode(201)
  async saveNote(@Body() dto: CreateNoteDto) {
    return await this.noteService.saveNote(dto);
  }

  @Get()
  async getAllNote() {
    return await this.noteService.findAllNotes({});
  }

  @Get('/:noteId')
  async getNoteById(@Param('noteId') noteId: string) {
    return await this.noteService.findOneNote({
      where: {
        noteId,
      },
    });
  }

  @Patch('/:noteId')
  async updateNoteById(
    @Param('noteId') noteId: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return await this.noteService.updateNote(noteId, dto);
  }

  @Delete('/:noteId')
  async deleteNoteById(@Param('noteId') noteId: string) {
    return await this.noteService.deleteNote(noteId);
  }
}
