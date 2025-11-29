import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import * as Sentry from '@sentry/react';
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
	return (
		<header>
			<SignedIn>
				<SentryRoutes>
					<Route path="/" element={<HomePage />} />
				</SentryRoutes>
			</SignedIn>
			<SignedOut>
				<SentryRoutes>
					<Route path="*" element={<AuthPage />} />
				</SentryRoutes>
			</SignedOut>
		</header>
	);
};

export default App;
