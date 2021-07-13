import NoteService from '../services/note.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note-dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    saveNote(dto: CreateNoteDto): Promise<import("../entity/note.entity").default>;
    getAllNote(): Promise<import("../entity/note.entity").default[]>;
    getNoteById(noteId: string): Promise<import("../entity/note.entity").default | undefined>;
    updateNoteById(noteId: string, dto: UpdateNoteDto): Promise<import("../entity/note.entity").default & UpdateNoteDto>;
    deleteNoteById(noteId: string): Promise<import("../entity/note.entity").default | null>;
}
