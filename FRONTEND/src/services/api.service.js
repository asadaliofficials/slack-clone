import { axiosInstance } from '../lib/axios';

export const getStreamToken = async () => {
	const response = await axiosInstance.get('/chat/token');
	return response.data;
};
