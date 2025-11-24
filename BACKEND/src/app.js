import express from 'express';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware());

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
