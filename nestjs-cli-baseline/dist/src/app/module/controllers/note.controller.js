"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const note_service_1 = require("../services/note.service");
const create_note_dto_1 = require("../dto/create-note.dto");
const update_note_dto_1 = require("../dto/update-note-dto");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    async saveNote(dto) {
        return await this.noteService.saveNote(dto);
    }
    async getAllNote() {
        return await this.noteService.findAllNotes({});
    }
    async getNoteById(noteId) {
        return await this.noteService.findOneNote({
            where: {
                noteId,
            },
        });
    }
    async updateNoteById(noteId, dto) {
        return await this.noteService.updateNote(noteId, dto);
    }
    async deleteNoteById(noteId) {
        return await this.noteService.deleteNote(noteId);
    }
};
__decorate([
    common_1.Post(),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "saveNote", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "getAllNote", null);
__decorate([
    common_1.Get('/:noteId'),
    __param(0, common_1.Param('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "getNoteById", null);
__decorate([
    common_1.Patch('/:noteId'),
    __param(0, common_1.Param('noteId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "updateNoteById", null);
__decorate([
    common_1.Delete('/:noteId'),
    __param(0, common_1.Param('noteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "deleteNoteById", null);
NoteController = __decorate([
    common_1.Controller('/api/v1/notes'),
    __metadata("design:paramtypes", [note_service_1.default])
], NoteController);
exports.NoteController = NoteController;
//# sourceMappingURL=note.controller.js.map