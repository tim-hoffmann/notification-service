import { HtmlError } from '../interfaces/html-error.interface';

export class HtmlTemplateInvalidException extends Error {
  constructor(public readonly errors: HtmlError[]) {
    super('Html template is invalid');
  }
}
