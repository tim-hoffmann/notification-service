import { Injectable, NestMiddleware, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import webConfig from '../web.config';

/**
 * Middleware for logging requests
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  /**
   * Creates an instance of RequestLoggerMiddleware
   *
   * @param {ConfigType<typeof webConfig>} config Access to the config
   */
  constructor(@Inject(webConfig.KEY) private config: ConfigType<typeof webConfig>) {}

  /**
   * Logs the request data
   *
   * @param {Request} request Incoming http request
   * @param {Response} response Outgoing http request
   * @param {NextFunction} next Next handler in the middleware pipeline
   */
  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = new Date().getTime();
    const { method, originalUrl, headers, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode: status } = response;
      const contentLength = response.get('content-length');
      const endAt = new Date().getTime();
      const duration = endAt - startAt;

      const message = this.config.enableLogRequestDetails
        ? JSON.stringify(
            {
              method,
              url: originalUrl,
              status,
              contentLength,
              duration,
              headers,
              body,
              query,
            },
            undefined,
            2,
          )
        : `${method} ${originalUrl} ${status} ${contentLength} ${duration}ms - ${userAgent}`;

      this.logger.debug(message);
    });

    next();
  }
}
