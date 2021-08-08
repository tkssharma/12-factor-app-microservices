import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import Note from '../entity/note.entity';
import * as _ from 'lodash';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';

@Injectable()
export default class NoteService {
	constructor(
		@InjectRepository(Note) private readonly noteRepository: Repository<Note>,
	) {}
	async saveNote(dto: CreateNoteDto) {
		const note = new Note();
		note.text = dto.text;
    note.is_completed = dto.is_completed;
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
			where: { id: noteId },
		});
		return await this.noteRepository.save(_.merge(foundNote, dto));
	}

	async deleteNote(noteId: string) {
		const foundNote = await this.findOneNote({
			where: { id: noteId },
		});
   if(foundNote) {
		await this.noteRepository.delete(foundNote);
		return foundNote;
   }
   return null;
	}
}
