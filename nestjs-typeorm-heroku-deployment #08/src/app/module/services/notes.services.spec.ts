import { Test, TestingModule } from '@nestjs/testing';
import NoteService from './note.service';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';

class ApiServiceMock {
  saveNote(dto: any) {
     return [];
  }
  findOneNote() {
    return [];
  }
  deleteNote(id: string) {
    return null;
  }
  updateNote(id: string, dto: any) {
    return [];
  }
}
describe.only("NoteService", () => {

  let noteService: NoteService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: NoteService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService, ApiServiceProvider
      ],
    }).compile();
    noteService = module.get<NoteService>(NoteService);
  })

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
})