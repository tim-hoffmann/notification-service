import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DEFAULT_LOCALE } from './constants/di-tokens.constant';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DEFAULT_LOCALE,
      useFactory: (cfg: ConfigService) => {
        const defaultLocale = cfg.get<string>('DEFAULT_LOCALE');
        if (!defaultLocale) throw new Error(`Could not find env variable: DEFAULT_LOCALE`);
        return defaultLocale;
      },
      inject: [ConfigService],
    },
  ],
  exports: [DEFAULT_LOCALE],
})
export class CoreModule {}
