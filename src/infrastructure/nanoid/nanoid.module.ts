import { Module } from '@nestjs/common';
import { UNIQUE_ID_SERVICE } from '../../core/constants/di-tokens.constant';
import { NanoidService } from './nanoid.service';

@Module({
  providers: [{ provide: UNIQUE_ID_SERVICE, useClass: NanoidService }],
  exports: [UNIQUE_ID_SERVICE],
})
export class NanoidModule {}
