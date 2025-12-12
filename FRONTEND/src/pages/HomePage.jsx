import { UserButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useStreamChat } from '../hooks/useStreamChat';
import PageLoader from '../components/PageLoader';

import {
	Chat,
	Channel,
	ChannelList,
	MessageList,
	MessageInput,
	Thread,
	Window,
} from 'stream-chat-react';

import '../styles/streamChatTheme.css';
import { HashIcon, PlusIcon, UsersIcon } from 'lucide-react';
import CreateChannelModal from '../components/CreateChannelModal';
import CustomChannelPreview from '../components/CustomChannelPreview';
import UsersList from '../components/UsersList';
import CustomChannelHeader from '../components/CustomChannelHeader';

const HomePage = () => {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [activeChannel, setActiveChannel] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();

	const { chatClient, error, isLoading } = useStreamChat();

	// set active channel from URL params
	useEffect(() => {
		if (chatClient) {
			const channelId = searchParams.get('channel');
			if (channelId) {
				const channel = chatClient.channel('messaging', channelId);
				setActiveChannel(channel);
			}
		}
	}, [chatClient, searchParams]);

	// todo: handle this with a better component
	if (error) return <p>Something went wrong... {error.message}</p>;
	if (isLoading || !chatClient) return <PageLoader />;

	return (
		<div className="chat-wrapper">
			<Chat client={chatClient}>
				<div className="chat-container">
					{/* LEFT SIDEBAR */}
					<div className="str-chat__channel-list">
						<div className="team-channel-list">
							{/* HEADER */}
							<div className="team-channel-list__header gap-4">
								<div className="brand-container">
									<img src="/logo.png" alt="Logo" className="brand-logo" />
									<span className="brand-name">SlacK</span>
								</div>
								<div className="user-button-wrapper">
									<UserButton />
								</div>
							</div>
							{/* CHANNELS LIST */}
							<div className="team-channel-list__content">
								<div className="create-channel-section">
									<button onClick={() => setIsCreateModalOpen(true)} className="create-channel-btn">
										<PlusIcon className="size-4" />
										<span>Create Channel</span>
									</button>
								</div>

								{/* CHANNEL LIST */}
								<ChannelList
									filters={{ members: { $in: [chatClient?.user?.id] } }}
									channelRenderFilterFn={channels => {
										return channels.filter(channel => {
											// Check channel ID (matching CustomChannelPreview's access pattern)
											const channelId = channel?.data?.id || channel?.id || '';
											// Check channel name
											const channelName = channel?.data?.name || '';
											// Filter out channels where ID or name starts with 'user_'
											return !channelId.startsWith('user_') && !channelName.startsWith('user_');
										});
									}}
									options={{ state: true, watch: true }}
									Preview={({ channel }) => (
										<CustomChannelPreview
											channel={channel}
											activeChannel={activeChannel}
											setActiveChannel={channel => setSearchParams({ channel: channel.id })}
										/>
									)}
									List={({ children, loading, error }) => (
										<div className="channel-sections">
											<div className="section-header">
												<div className="section-title">
													<HashIcon className="size-4" />
													<span>Channels</span>
												</div>
											</div>

											{/* todos: add better components here instead of just a simple text  */}
											{loading && <div className="loading-message">Loading channels...</div>}
											{error && <div className="error-message">Error loading channels</div>}

											<div className="channels-list">{children}</div>

											<div className="section-header direct-messages">
												<div className="section-title">
													<UsersIcon className="size-4" />
													<span>Direct Messages</span>
												</div>
											</div>
											<UsersList activeChannel={activeChannel} />
										</div>
									)}
								/>
							</div>
						</div>
					</div>

					{/* RIGHT CONTAINER */}
					<div className="chat-main">
						<Channel
							channel={activeChannel}
							doSendMessageRequest={async (channelId, message) => {
								// Remove the pending flag which causes the error
								const { pending, ...messageWithoutPending } = message;
								return activeChannel.sendMessage(messageWithoutPending);
							}}
						>
							<Window>
								<CustomChannelHeader />
								<MessageList />
								<MessageInput />
							</Window>

							<Thread />
						</Channel>
					</div>
				</div>

				{isCreateModalOpen && <CreateChannelModal onClose={() => setIsCreateModalOpen(false)} />}
			</Chat>
		</div>
	);
};
export default HomePage;
