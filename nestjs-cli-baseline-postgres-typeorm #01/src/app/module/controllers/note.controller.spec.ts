import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import NoteService from '../services/note.service';
import { CreateNoteDto, GetNoteById } from '../dto/create-note.dto';

describe("NoteController Unit Tests", () => {
  let noteController: NoteController;
  let spyService: NoteService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: NoteService,
      useFactory: () => ({
        saveNote: jest.fn(() => []),
        findAllNotes: jest.fn(() => []),
        findOneNote: jest.fn(() => { }),
        updateNote: jest.fn(() => { }),
        deleteNote: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService, ApiServiceProvider],
    }).compile();

    noteController = app.get<NoteController>(NoteController);
    spyService = app.get<NoteService>(NoteService);
  })

  it("calling saveNotes method", () => {
    const dto = new CreateNoteDto();
    expect(noteController.saveNote(dto)).not.toEqual(null);
  })

  it("calling saveNotes method", () => {
    const dto = new CreateNoteDto();
    noteController.saveNote(dto);
    expect(spyService.saveNote).toHaveBeenCalled();
    expect(spyService.saveNote).toHaveBeenCalledWith(dto);
  })

  it("calling getAllNote method", () => {
    noteController.getAllNote();
    expect(spyService.findAllNotes).toHaveBeenCalled();
  })

  it("calling find NoteById method", () => {
    const dto = new GetNoteById();
    dto.id = '3789';
    noteController.getNoteById(dto);
    expect(spyService.findOneNote).toHaveBeenCalled();
  })

});