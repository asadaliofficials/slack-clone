import mongoose from 'mongoose';
import { MONGODB_URI } from './env.config.js';

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Database connected');
	} catch (error) {
		console.log('Failed to conntect with DB!');
	}
};

export default connectDB;
