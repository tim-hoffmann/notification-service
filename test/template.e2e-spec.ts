import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { WebModule } from '../src/web/web.module';

describe('TemplateController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  describe('/:tenantId/templates (POST)', () => {
    it('should create a new template', async () => {
      const response = await request(app.getHttpServer()).post('/tenant/templates').send({
        name: 'test2',
        from: 'test@test.de',
        transportType: 'Email',
        textTemplate: 'Das ist ein Test!',
        subjectTemplate: 'Hallo',
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('should return validation error on invalid request', () => {
      return request(app.getHttpServer())
        .post('/tenant/templates')
        .send({ name: 'test2' })
        .expect(400);
    });
  });

  describe('/:tenantId/templates/:id (GET)', () => {
    it('should return the requested template', async () => {
      const response = await request(app.getHttpServer()).get('/tenant/templates/B2K4nfcZNi0mPMCH');

      expect(response.statusCode).toBe(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
