import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { functions, inngest } from './config/inngest.config.js';
import connectDB from './config/db.config.js';
import { NODE_ENV, PORT } from './config/env.config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware());

app.use('/api/inngest', serve({ client: inngest, functions }));

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

const startServer = () => {
	try {
		connectDB();
		if (NODE_ENV === 'development') {
			app.listen(PORT, () => {
				console.log('Server listening on port', PORT);
			});
		}
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

startServer();

export default app;
