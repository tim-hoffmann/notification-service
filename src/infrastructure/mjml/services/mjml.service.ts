import { HtmlService } from '../../../core/services/html.service.interface';
import mjml2html from 'mjml';
import { Logger } from '@nestjs/common';
import { HtmlError } from '../../../core/interfaces/html-error.interface';

export class MjmlService implements HtmlService {
  private logger = new Logger(MjmlService.name);

  transform(input: string): Promise<string> {
    const { errors, html } = this.toHtml(input);

    if (errors.length) {
      this.logger.warn('Invalid html template', errors);
      throw new Error('Invalid html template');
    }

    return Promise.resolve(html);
  }

  validate(input: string): Promise<HtmlError[]> {
    try {
      const { errors } = this.toHtml(input);
      return Promise.resolve(errors);
    } catch (ex) {
      if (ex instanceof Error) {
        return Promise.resolve<HtmlError[]>([
          {
            formattedMessage: ex.message,
            line: -1,
            message: ex.message,
            tagName: 'n/a',
          },
        ]);
      }

      throw ex;
    }
  }

  private toHtml(input: string) {
    return mjml2html(input, { validationLevel: 'strict' });
  }
}
