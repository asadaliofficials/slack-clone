import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { useChatContext } from 'stream-chat-react';

import * as Sentry from '@sentry/react';
import { CircleIcon } from 'lucide-react';

const UsersList = ({ activeChannel }) => {
	const { client } = useChatContext();
	const [_, setSearchParams] = useSearchParams();

	const fetchUsers = useCallback(async () => {
		if (!client?.user) return;

		const response = await client.queryUsers(
			{ id: { $ne: client.user.id } },
			{ name: 1 },
			{ limit: 20 }
		);

		const usersOnly = response.users.filter(user => !user.id.startsWith('recording-'));

		return usersOnly;
	}, [client]);

	const {
		data: users = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['users-list', client?.user?.id],
		queryFn: fetchUsers,
		enabled: !!client?.user,
		staleTime: 1000 * 60 * 5, // 5 mins
	});

	// staleTime
	// what it does: tells React Query the data is "fresh" for 5 minutes
	// behavior: during these 5 minutes, React Query WON'T refetch the data automatically

	const startDirectMessage = async targetUser => {
		if (!targetUser || !client?.user) return;

		try {
			//  bc stream does not allow channelId to be longer than 64 chars
			const channelId = [client.user.id, targetUser.id].sort().join('-').slice(0, 64);
			const channel = client.channel('messaging', channelId, {
				members: [client.user.id, targetUser.id],
			});
			await channel.watch();
			setSearchParams({ channel: channel.id });
		} catch (error) {
			console.log('Error creating DM', error),
				Sentry.captureException(error, {
					tags: { component: 'UsersList' },
					extra: {
						context: 'create_direct_message',
						targetUserId: targetUser?.id,
					},
				});
		}
	};

	if (isLoading) return <div className="team-channel-list__message">Loading users...</div>;
	if (isError) return <div className="team-channel-list__message">Failed to load users</div>;
	if (!users.length) return <div className="team-channel-list__message">No other users found</div>;

	return (
		<div className="team-channel-list__users">
			{users.map(user => {
				const channelId = [client.user.id, user.id].sort().join('-').slice(0, 64);
				const channel = client.channel('messaging', channelId, {
					members: [client.user.id, user.id],
				});
				const unreadCount = channel.countUnread();
				const isActive = activeChannel && activeChannel.id === channelId;

				return (
					<button
						key={user.id}
						onClick={() => startDirectMessage(user)}
						className={`str-chat__channel-preview-messenger  ${
							isActive && '!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg0'
						}`}
					>
						<div className="flex items-center gap-2 w-full">
							<div className="relative">
								{user.image ? (
									<img
										src={user.image}
										alt={user.name || user.id}
										className="w-4 h-4 rounded-full"
									/>
								) : (
									<div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
										<span className="text-xs text-white">
											{(user.name || user.id).charAt(0).toUpperCase()}
										</span>
									</div>
								)}

								<CircleIcon
									className={`w-2 h-2 absolute -bottom-0.5 -right-0.5 ${
										user.online ? 'text-green-500 fill-green-500' : 'text-gray-400 fill-gray-400'
									}`}
								/>
							</div>

							<span className="str-chat__channel-preview-messenger-name truncate">
								{user.name || user.id}
							</span>

							{unreadCount > 0 && (
								<span className="flex items-center justify-center ml-2 size-4 text-xs rounded-full bg-red-500 ">
									{unreadCount}
								</span>
							)}
						</div>
					</button>
				);
			})}
		</div>
	);
};

export default UsersList;
