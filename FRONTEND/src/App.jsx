import { useAuth } from '@clerk/clerk-react';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import * as Sentry from '@sentry/react';
import CallPage from './pages/CallPage';
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return null;
	}

	return (
		<header>
			<SentryRoutes>
				<Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to={'/auth'} replace />} />
				<Route
					path="/call/:id"
					element={isSignedIn ? <CallPage /> : <Navigate to={'/auth'} replace />}
				/>

				<Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={'/'} replace />} />
				<Route
					path="*"
					element={isSignedIn ? <Navigate to={'/'} replace /> : <Navigate to={'/auth'} replace />}
				/>
			</SentryRoutes>
		</header>
	);
};

export default App;
