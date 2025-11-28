import mongoose from 'mongoose';
import { MONGODB_URI } from './env.config.js';

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
		console.log('Database connected');
	} catch (e) {
		cached.promise = null;
		console.log('Failed to connect with DB!', e);
		throw e;
	}

	return cached.conn;
};

export default connectDB;
