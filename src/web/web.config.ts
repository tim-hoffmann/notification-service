import { registerAs } from '@nestjs/config';

export default registerAs('web', () => ({
  enableLogRequestDetails: [true, 'true', 1, '1'].includes(
    process.env.ENABLE_LOG_REQUEST_DETAILS ?? false,
  ),
}));
