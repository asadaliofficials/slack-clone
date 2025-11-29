import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const App = () => {
	return (
		<header>
			<SignedIn>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</SignedIn>
			<SignedOut>
				<Routes>
					<Route path="*" element={<AuthPage />} />
				</Routes>
			</SignedOut>
		</header>
	);
};

export default App;
