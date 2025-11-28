import express from 'express';
import '../instrument.mjs';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { functions, inngest } from './config/inngest.config.js';
import connectDB from './config/db.config.js';
import { NODE_ENV, PORT } from './config/env.config.js';
import chatRoutes from './routes/chat.route.js';
import * as Sentry from '@sentry/node';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware());
app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/', (req, res) => {
	res.send('API is running...');
});
app.get('/api', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/health', (req, res) => {
	res.json({
		status: 'ok',
		statusCode: 200,
		message: 'Healthy',
	});
});

app.get('/api/error', (req, res) => {
	throw new Error('Test error');
});

app.use('/api/chat', chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
	try {
		await connectDB();
		if (NODE_ENV === 'development') {
			app.listen(PORT, () => {
				console.log('Server listening on port', PORT);
			});
		}
	} catch (error) {
		console.log(error);
		// process.exit(1); // Don't exit in serverless environment
	}
};

startServer();

export default app;
