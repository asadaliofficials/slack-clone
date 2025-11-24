import { config } from 'dotenv';

config();

export const { PORT, MONGODB_URI, NODE_ENV } = process.env;
