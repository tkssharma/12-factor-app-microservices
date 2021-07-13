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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("../entity/note.entity");
const _ = require("lodash");
let NoteService = class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async saveNote(dto) {
        const note = new note_entity_1.default();
        note.text = dto.text;
        return await this.noteRepository.save(note);
    }
    async findAllNotes(findAllOptions) {
        return await this.noteRepository.find(findAllOptions);
    }
    async findOneNote(findOneOptions) {
        return await this.noteRepository.findOne(findOneOptions);
    }
    async updateNote(noteId, dto) {
        const foundNote = await this.findOneNote({
            where: { noteId },
        });
        return await this.noteRepository.save(_.merge(foundNote, dto));
    }
    async deleteNote(noteId) {
        const foundNote = await this.findOneNote({
            where: { noteId },
        });
        if (foundNote) {
            await this.noteRepository.delete(foundNote);
            return foundNote;
        }
        return null;
    }
};
NoteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(note_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NoteService);
exports.default = NoteService;
//# sourceMappingURL=note.service.js.map