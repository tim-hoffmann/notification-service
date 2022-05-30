import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { EntityNotFoundException } from '../../core/exceptions/entity-not-found.exception';
import { Response } from 'express';

@Catch(EntityNotFoundException)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(_: EntityNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not Found',
    });
  }
}
