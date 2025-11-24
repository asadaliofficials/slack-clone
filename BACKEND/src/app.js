import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { functions, inngest } from './config/inngest.config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware());

app.use('/api/inngest', serve({client: inngest, functions}))

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/health', (req, res) => {
	res.json({
		status: 'ok',
		statusCode: 200,
		message: 'Healthy',
	});
});

export default app;
