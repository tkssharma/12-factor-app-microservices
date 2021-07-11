import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import Note from '../entity/note.entity';
import * as _ from 'lodash';
import { UpdateNoteDto } from '../dto/update-note-dto';

@Injectable()
export class NoteService {
	constructor(
		@InjectRepository(Note) private readonly noteRepository: Repository<Note>,
	) {}
	async saveNote(dto: CreateNoteDto) {
		const note = new Note();
		note.text = dto.text;
		return await this.noteRepository.save(note);
	}

	async findAllNotes(findAllOptions: FindManyOptions<Note>) {
		return await this.noteRepository.find(findAllOptions);
	}

	async findOneNote(findOneOptions: FindOneOptions<Note>) {
		return await this.noteRepository.findOne(findOneOptions);
	}

	async updateNote(noteId: string, dto: UpdateNoteDto) {
		const foundNote = await this.findOneNote({
			where: { noteId },
		});
		return await this.noteRepository.save(_.merge(foundNote, dto));
	}

	async deleteNote(noteId: string) {
		const foundNote = await this.findOneNote({
			where: { noteId },
		});
    if(foundNote) {
      await this.noteRepository.delete(foundNote?.id);
      return foundNote;
    }
    return null;
	}
}
