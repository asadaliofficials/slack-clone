import { UserButton } from '@clerk/clerk-react';
import React from 'react';

import {chatclient, isloading, error} from '../hooks/useStreamChat'

const HomePage = () => {

	return (
		<>
			<div>HomePage</div>
			<UserButton />
		</>
	);
};

export default HomePage;
