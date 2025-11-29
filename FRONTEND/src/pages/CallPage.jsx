import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

import { getStreamToken } from '../services/api.service';

import {
	StreamVideo,
	StreamVideoClient,
	StreamCall,
	CallControls,
	SpeakerLayout,
	StreamTheme,
	CallingState,
	useCallStateHooks,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
	const { id: callId } = useParams();
	const { user, isLoaded } = useUser();

	const [client, setClient] = useState(null);
	const [call, setCall] = useState(null);
	const [isConnecting, setIsConnecting] = useState(true);

	const { data: tokenData } = useQuery({
		queryKey: ['streamToken'],
		queryFn: getStreamToken,
		enabled: !!user,
	});

	useEffect(() => {
		const initCall = async () => {
			if (!tokenData.token || !user || !callId) return;

			try {
				const videoClient = new StreamVideoClient({
					apiKey: STREAM_API_KEY,
					user: {
						id: user.id,
						name: user.fullName,
						image: user.imageUrl,
					},
					token: tokenData.token,
				});

				const callInstance = videoClient.call('default', callId);
				await callInstance.join({ create: true });

				setClient(videoClient);
				setCall(callInstance);
			} catch (error) {
				console.log('Error init call:', error);
				toast.error('Cannot connect to the call.');
			} finally {
				setIsConnecting(false);
			}
		};

		initCall();
	}, [tokenData, user, callId]);

	if (isConnecting || !isLoaded) {
		return <div className="h-screen flex justify-center items-center">Connecting to call...</div>;
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="relative w-full max-w-4xl mx-auto">
				{client && call ? (
					<StreamVideo client={client}>
						<StreamCall call={call}>
							<CallContent />
						</StreamCall>
					</StreamVideo>
				) : (
					<div className="flex items-center justify-center h-full">
						<p>Could not initialize call. Please refresh or try again later</p>
					</div>
				)}
			</div>
		</div>
	);
};

const CallContent = () => {
	const { useCallCallingState } = useCallStateHooks();

	const callingState = useCallCallingState();
	const navigate = useNavigate();

	if (callingState === CallingState.LEFT) return navigate('/');

	return (
		<StreamTheme>
			<SpeakerLayout />
			<CallControls />
		</StreamTheme>
	);
};

export default CallPage;
