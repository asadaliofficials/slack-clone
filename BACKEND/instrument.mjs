import * as Sentry from '@sentry/node';
import { SENTRY_DSN, NODE_ENV } from './src/config/env.config.js';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: NODE_ENV || 'development',
  includeLocalVariables: true,


  sendDefaultPii: true
});