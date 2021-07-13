import { CreateNoteDto } from '../src/app/module/dto/create-note.dto';
import { UpdateNoteDto } from '../src/app/module/dto/update-note-dto';

export class MockFactory {
  genCreateNoteDto() {
    const dto = new CreateNoteDto();
    dto.text = 'Learn Testing';
    return dto;
  }

  genUpdateNoteDto() {
    const dto = new UpdateNoteDto();
    dto.isCompleted = true;
    return dto;
  }
}
