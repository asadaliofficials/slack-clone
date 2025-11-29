import { createContext, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
	const { getToken } = useAuth();
	useEffect(() => {
		const interceptor = axiosInstance.interceptors.request.use(async config => {
			try {
				const token = await getToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			} catch (error) {
				if (error.message?.includes('auth') || error.message?.includes('token')) {
					toast.error('Authentication error. Please sign in again.');
				}
				console.log('Error while getting the token');
				return config;
			}
			error => {
				console.log('Error in request interceptor:', error);
				return Promise.reject(error);
			};
		});

      return () => {
          axiosInstance.interceptors.request.eject(interceptor);
  }
	}, [getToken]);

  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
};
