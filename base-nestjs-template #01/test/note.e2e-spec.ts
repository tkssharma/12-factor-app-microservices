import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MockFactory } from './mock.factory';
import { AppModule } from '../src/app.module';
import { DbModule } from '../src/db/db.module';
import { DatabaseService } from '../src/db/db.service';
import { TestUtils } from './utils';

describe('/notes (e2e)', () => {
	let app: INestApplication;
	let testUtils: TestUtils;
	const mockFactory = new MockFactory();
	const newNote = mockFactory.genCreateNoteDto();
	const updateNote = mockFactory.genUpdateNoteDto();

	beforeEach(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule, DbModule],
			providers: [DatabaseService, TestUtils],
		}).compile();

		testUtils = moduleFixture.get<TestUtils>(TestUtils);
		await testUtils.reloadFixtures();
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async done => {
		await testUtils.reloadFixtures();
		await testUtils.closeDbConnection();
		done();
	});

	it('POST Note', async () => {
		try {
			const response = await request(app.getHttpServer())
				.post('/notes')
				.send(newNote)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');

			expect(response.status).toBe(201);
			expect(typeof response.body).toBe('object');
			expect(response.body).toHaveProperty('noteId');
			expect(response.body).toHaveProperty('createdAt');
			expect(response.body).toHaveProperty('isCompleted');
			expect(response.body.text).toBe(newNote.text);
			expect(response.body.isCompleted).toBe(false);
		} catch (err) {
			throw err;
		}
	});

	it('GET Note by noteId', async () => {
		try {
			const createNoteResponse = await request(app.getHttpServer())
				.post('/notes')
				.send(newNote)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');
			const getNoteResponse = await request(app.getHttpServer())
				.get(`/notes/${createNoteResponse.body.noteId}`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');

			expect(getNoteResponse.status).toBe(200);
			expect(typeof getNoteResponse.body).toBe('object');
			expect(getNoteResponse.body.noteId).toBe(createNoteResponse.body.noteId);
		} catch (err) {
			throw err;
		}
	});

	it('GET all Notes', async () => {
		try {
			const createNoteResponse = await request(app.getHttpServer())
				.post('/notes')
				.send(newNote)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');

			const getNotesResponse = await request(app.getHttpServer())
				.get(`/notes`)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');

			expect(getNotesResponse.status).toBe(200);
			expect(typeof getNotesResponse.body).toBe('object');
			expect(getNotesResponse.body).toHaveLength(1);
			expect(getNotesResponse.body[0].noteId).toBe(
				createNoteResponse.body.noteId,
			);
		} catch (err) {
			throw err;
		}
	});

	it('PATCH Note by noteId', async () => {
		const createNoteResponse = await request(app.getHttpServer())
			.post('/notes')
			.send(newNote)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json');

		const updateNoteResponse = await request(app.getHttpServer())
			.patch(`/notes/${createNoteResponse.body.noteId}`)
			.send(updateNote)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json');

		expect(updateNoteResponse.status).toBe(200);
		expect(typeof updateNoteResponse).toBe('object');
		expect(updateNoteResponse.body.isCompleted).toBe(updateNote.isCompleted);
	});

	it('DELETE Note by noteId', async () => {
		const createNoteResponse = await request(app.getHttpServer())
			.post('/notes')
			.send(newNote)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json');

		const deleteNoteResponse = await request(app.getHttpServer())
			.delete(`/notes/${createNoteResponse.body.noteId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json');

		expect(deleteNoteResponse.status).toBe(200);
		expect(typeof deleteNoteResponse.body).toBe('object');
		expect(deleteNoteResponse.body.noteId).toBe(createNoteResponse.body.noteId);
	});
});
