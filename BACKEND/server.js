import app from './src/app.js';
import connectDB from './src/config/db.config.js';

import { NODE_ENV, PORT } from './src/config/env.config.js';

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
