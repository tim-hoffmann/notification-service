import { UniqueIdService } from '../../core/services/unique-id.service';
import { customAlphabet } from 'nanoid/async';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NanoidService implements UniqueIdService {
  // at 1000 ids/hour there are ~4 million years needed, in order to have a 1% probability of at least one collision.
  private readonly nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    16,
  );

  async generate(): Promise<string> {
    return this.nanoid();
  }
}
