import { HtmlService } from '../../../core/services/html.service.interface';
import mjml2html from 'mjml';
import { Logger } from '@nestjs/common';

export class MjmlService implements HtmlService {
  private logger = new Logger(MjmlService.name);

  transform(input: string): Promise<string> {
    const { errors, html } = this.toHtml(input);

    if (errors) {
      this.logger.warn('Invalid html template', errors);
      throw new Error('Invalid html template');
    }

    return Promise.resolve(html);
  }

  validate(input: string): Promise<any[]> {
    const { errors } = this.toHtml(input);
    return Promise.resolve(errors);
  }

  private toHtml(input: string) {
    return mjml2html(input, { validationLevel: 'strict' });
  }
}
