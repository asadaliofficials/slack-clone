import { axiosInstance } from '../lib/axios';

export const getStreamToken = async () => {
	try {
		const response = await axiosInstance.get('/chat/token');
		console.log(response);

		return response.data;
	} catch (error) {
		console.error('Error fetching Stream token:', error);
		throw error;
	}
};
