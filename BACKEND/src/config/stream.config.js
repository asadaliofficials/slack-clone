import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY, STREAM_API_SECRET } from './env.config.js';

const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export const upsertStreamUser = async userData => {
	try {
		await streamClient.upsertUser(userData);
		console.log('Stream user upserted successfully:', userData.name);
		return userData;
	} catch (error) {
		console.log('Error upserting Stream user:', error);
		
	}
};

export const deleteStreamUser = async userId => {
	try {
		await streamClient.deleteUser(userId);
		console.log('Stream user deleted successfully:', userId);
	} catch (error) {
		console.error('Error deleting Stream user:', error);
	}
};

export const generateStreamToken = async userId => {
	try {
		return streamClient.createToken(userId.toString());
	} catch (error) {
		console.log('Failed to get stream token');
		return null;
	}
};
