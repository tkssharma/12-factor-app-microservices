import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import 'jest';
import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/db/db.service';
import { TestUtils } from '../utils';
import { DbModule } from '../../src/db/db.module';

describe('NDA (Documents) /api/v1/nda (POST) :: Happy Path', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let moduleRef: TestingModule;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestUtils, DatabaseService],
    })
      .compile();

    app = moduleRef.createNestApplication();
    testUtils = moduleRef.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await app.init();
  });

  it('Notes api - create', async () => {
    const resp = await request(app.getHttpServer())
      .post('/api/v1/notes')
      .send({
        "text": "string",
        "is_completed": true
      });
    expect(resp.status).toEqual(201);
  });
});
