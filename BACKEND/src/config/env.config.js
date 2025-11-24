import { config } from 'dotenv';

config();

export const {
	PORT,
	MONGODB_URI,
	NODE_ENV,
	CLERK_PUBLISHABLE_KEY,
	CLERK_SECRET_KEY,
	SLACK_API_KEY,
	SLACK_API_SECRET,
	SENTRY_DSN,
	INJEST_EVENT_KEY,
	INJEST_SIGNING_KEY,
} = process.env;
