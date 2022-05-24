/*
 * Projekt: Biobedded Logging
 * Programmierer: Tim Hoffmann
 * Projektbeginn: 07.04.2022
 * Programmierumgebung: VSCode
 * Plattform: macOS Monterey
 * Copyright: biobedded system GmbH 2022
 * ID der Datei: /src/middlewares/specs/request-logger.middleware.spec.ts
 * 11.04.2022 12:05 Uhr
 */

import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import webConfig from '../../web.config';
import { RequestLoggerMiddleware } from '../request-logger.middleware';

const loggerMockFactory = () => ({
  setContext: jest.fn(),
  debug: jest.fn(),
});

describe('RequestLoggerMiddleware', () => {
  let middleware: RequestLoggerMiddleware;
  let loggerMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestLoggerMiddleware,
        { provide: Logger, useFactory: loggerMockFactory },
        { provide: webConfig.KEY, useValue: {} },
      ],
    }).compile();

    middleware = module.get(RequestLoggerMiddleware);
    loggerMock = module.get(Logger);

    module.useLogger(loggerMock);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log request on debug level', () => {
    // Arrange
    const req: any = {
      get: jest.fn(),
      method: 'GET',
      originalUrl: '/test',
    };
    let callback;
    const res: any = {
      get: jest.fn(),
      on: (_, cb) => (callback = cb),
    };
    const next = jest.fn();

    // Act
    middleware.use(req, res, next);
    callback();

    // Assert
    expect(next).toBeCalledTimes(1);
    expect(loggerMock.debug).toBeCalledTimes(1);
  });
});
