import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY, STREAM_API_SECRET } from './env.config.js';

const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export const upsertStreamUser = async userData => {
	try {
		await streamClient.upsertUser(userData);
	} catch (error) {
		console.log('Failed to upsert user on stream');
	}
};

export const deleteStreamUser = async userId => {
	try {
		await streamClient.deleteUser(userId);
	} catch (error) {
		console.log('Failed to delete user on stream');
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
