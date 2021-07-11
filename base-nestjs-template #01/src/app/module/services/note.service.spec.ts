import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import * as sinon from 'sinon';
import { getRepositoryToken } from '@nestjs/typeorm';
import Note from '../entity/note.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';

describe('NoteService', () => {
	let noteService: NoteService;
	let sandbox: sinon.SinonSandbox;
	beforeAll(async () => {
		sandbox = sinon.createSandbox();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NoteService,
				{
					provide: getRepositoryToken(Note),
					useValue: sinon.createStubInstance(Repository),
				},
			],
		}).compile();
		noteService = module.get<NoteService>(NoteService);
	});

	it('should call saveNote method with expected params', async () => {
		const createNoteSpy = jest.spyOn(noteService, 'saveNote');
		const dto = new CreateNoteDto();
		noteService.saveNote(dto);
		expect(createNoteSpy).toHaveBeenCalledWith(dto);
	});

	it('should call findOneNote method with expected param', async () => {
		const findOneNoteSpy = jest.spyOn(noteService, 'findOneNote');
		const findOneOptions: FindOneOptions = {};
		noteService.findOneNote(findOneOptions);
		expect(findOneNoteSpy).toHaveBeenCalledWith(findOneOptions);
	});

	it('should call findAllNotes method with expected param', async () => {
		const findAllNotesSpy = jest.spyOn(noteService, 'findAllNotes');
		const findAllOptions: FindManyOptions = {};
		noteService.findAllNotes(findAllOptions);
		expect(findAllNotesSpy).toHaveBeenCalledWith(findAllOptions);
	});

	it('should call updateNote method with expected params', async () => {
		const updateNoteSpy = jest.spyOn(noteService, 'updateNote');
		const noteId = 'noteId';
		const dto = new UpdateNoteDto();
		noteService.updateNote(noteId, dto);
		expect(updateNoteSpy).toHaveBeenCalledWith(noteId, dto);
	});

	it('should call deleteNote method with expected param', async () => {
		const deleteNoteSpy = jest.spyOn(noteService, 'deleteNote');
		const noteId = 'noteId';
		noteService.deleteNote(noteId);
		expect(deleteNoteSpy).toHaveBeenCalledWith(noteId);
	});

	afterAll(async () => {
		sandbox.restore();
	});
});
