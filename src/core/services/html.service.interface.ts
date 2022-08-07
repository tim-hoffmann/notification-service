import { HtmlError } from '../interfaces/html-error.interface';

export interface HtmlService {
  transform(input: string): Promise<string>;
  validate(input: string): Promise<HtmlError[]>;
}
