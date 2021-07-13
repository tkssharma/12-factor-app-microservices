import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import Note from '../entity/note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';
export default class NoteService {
    private readonly noteRepository;
    constructor(noteRepository: Repository<Note>);
    saveNote(dto: CreateNoteDto): Promise<Note>;
    findAllNotes(findAllOptions: FindManyOptions<Note>): Promise<Note[]>;
    findOneNote(findOneOptions: FindOneOptions<Note>): Promise<Note | undefined>;
    updateNote(noteId: string, dto: UpdateNoteDto): Promise<Note & UpdateNoteDto>;
    deleteNote(noteId: string): Promise<Note | null>;
}
