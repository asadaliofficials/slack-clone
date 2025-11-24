import app from './src/app.js';
import connectDB from './src/config/db.config.js';

import { PORT } from './src/config/env.config.js';

app.listen(PORT, () => {
	connectDB();
	console.log('Server listening on port', PORT);
});
