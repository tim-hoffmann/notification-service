import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { WebModule } from '../src/web/web.module';
import dynamoDbConfig from '../src/infrastructure/dynamo-db/dynamo-db.config';

describe('TemplateController (e2e)', () => {
  let app: INestApplication;
  const tenant = 'test-tenant';
  const id = 'B2K4nfcZNi0mPMCH';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebModule],
    })
      .overrideProvider(dynamoDbConfig.KEY)
      .useValue({
        region: 'local',
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        tableName: 'notification-service',
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  describe('/:tenantId/templates (POST)', () => {
    it('should create a new template', async () => {
      const response = await request(app.getHttpServer()).post(`/${tenant}/templates`).send({
        name: 'test2',
        from: 'test@test.de',
        transportType: 'Email',
        textTemplate: 'Das ist ein Test!',
        subjectTemplate: 'Hallo',
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('should return validation errors on invalid request', () => {
      return request(app.getHttpServer())
        .post('/tenant/templates')
        .send({ name: 'test2' })
        .expect(400);
    });
  });

  describe('/:tenantId/templates/:id (GET)', () => {
    it('should return the requested template', async () => {
      const response = await request(app.getHttpServer()).get(`/${tenant}/templates/${id}`);
      expect(response.statusCode).toBe(200);
    });

    it('should return 404 for invalid id', async () => {
      const response = await request(app.getHttpServer()).get(`/${tenant}/templates/xxx`);
      expect(response.statusCode).toBe(404);
    });

    it('should return localized template', async () => {
      const response = await request(app.getHttpServer())
        .get(`/${tenant}/templates/${id}`)
        .query({ locale: 'de-CH' });

      expect(response.statusCode).toBe(200);
      expect(response.body.locale).toBe('de-CH');
    });

    it('should return 404 for invalid locale', async () => {
      const response = await request(app.getHttpServer())
        .get(`/${tenant}/templates/${id}`)
        .query({ locale: 'xx-XX' });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('/:tenantId/templates (GET)', () => {
    it('should return all templates', async () => {
      const response = await request(app.getHttpServer()).get(`/${tenant}/templates`);

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(2);
    });

    it('should limit returned templates', async () => {
      const response = await request(app.getHttpServer())
        .get(`/${tenant}/templates`)
        .query({ first: 1 });

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(1);
      expect(response.body.endCursor).toBeDefined();
      expect(response.body.hasNextPage).toBeTruthy();
    });
  });

  describe('/:tenantId/templates (PATCH)', () => {
    it('should patch the template', async () => {
      const patchResponse = await request(app.getHttpServer())
        .patch(`/${tenant}/templates/${id}`)
        .send({
          textTemplate: 'Das ist ein Patch Test!',
          from: 'patch@test.de',
          htmlTemplate: '<html>test</html>',
        });

      expect(patchResponse.statusCode).toBe(200);
      expect(patchResponse.body.id).toBe(id);
      expect(patchResponse.body.textTemplate).toBe('Das ist ein Patch Test!');
      expect(patchResponse.body.from).toBe('patch@test.de');
      expect(patchResponse.body.subjectTemplate).toBe('Hallo das ist der Betreff');
      expect(patchResponse.body.htmlTemplate).toBe('<html>test</html>');
    });
  });

  describe('/:tenantId/templates (DELETE)', () => {
    it('should delete the template', async () => {
      const response = await request(app.getHttpServer()).delete(`/${tenant}/templates/${id}`);

      expect(response.statusCode).toBe(204);
    });
  });

  describe('/:tenantId/templates/:id/locales (POST)', () => {
    it('should create a new template locale', async () => {
      const response = await request(app.getHttpServer())
        .post(`/${tenant}/templates/${id}/locales`)
        .send({
          textTemplate: 'Das ist ein Test!',
          subjectTemplate: 'Hallo',
          locale: 'de-DE',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.locale).toBe('de-DE');
    });

    it('should return validation error on invalid request', () => {
      return request(app.getHttpServer())
        .post('/tenant/templates')
        .send({ name: 'test2' })
        .expect(400);
    });
  });

  describe('/:tenantId/templates/:id/locales (GET)', () => {
    it('should return all locale labels of the template', async () => {
      const response = await request(app.getHttpServer()).get(`/${tenant}/templates/${id}/locales`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(['de-CH', 'en-US']);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
