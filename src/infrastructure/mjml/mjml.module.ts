import { Module } from '@nestjs/common';
import { HTML_SERVICE } from '../../core/constants/di-tokens.constant';
import { MjmlService } from './services/mjml.service';

@Module({
  providers: [{ provide: HTML_SERVICE, useClass: MjmlService }],
  exports: [HTML_SERVICE],
})
export class MjmlModule {}
