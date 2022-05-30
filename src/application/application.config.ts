import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  defaultLocale: process.env.ENABLE_LOG_REQUEST_DETAILS ?? 'en-US',
}));
