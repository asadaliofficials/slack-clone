import { config } from 'dotenv';

config();

export const {
	PORT,
	MONGODB_URI,
	NODE_ENV,
	CLERK_PUBLISHABLE_KEY,
	CLERK_SECRET_KEY,
	STREAM_API_KEY,
	STREAM_API_SECRET,
	SENTRY_DSN,
	INNGEST_EVENT_KEY,
	INNGEST_SIGNING_KEY,
} = process.env;
