export interface HtmlService {
  transform(input: string): Promise<string>;
  validate(input: string): Promise<any[]>;
}
