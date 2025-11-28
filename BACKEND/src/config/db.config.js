import mongoose from 'mongoose';
import { MONGODB_URI } from './env.config.js';

const connectDB = async () => {
	// if (mongoose.connection.readyState === 1) {
	// 	// Already connected
	// 	return;
	// }
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Database connected');
	} catch (error) {
		console.log('Failed to connect with DB!');
	}
};

export default connectDB;
