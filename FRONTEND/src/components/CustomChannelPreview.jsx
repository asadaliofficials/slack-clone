import { HashIcon } from 'lucide-react';

const CustomChannelPreview = ({ channel, setActiveChannel, activeChannel }) => {
	const isActive = activeChannel && activeChannel.id === channel.id;
	const channelId = channel?.data?.id || channel?.id || '';
	const channelName = channel?.data?.name || '';
	// Filter out channels where ID or name starts with 'user_'
	const isDM = channelId.startsWith('user_') || channelId.startsWith('ai_tools');

	if (isDM) return null;

	const unreadCount = channel.countUnread();

	return (
		<button
			onClick={() => setActiveChannel(channel)}
			className={`str-chat__channel-preview-messenger transition-colors flex items-center w-full text-left px-4 py-2 rounded-lg mb-1 font-medium hover:bg-blue-50/80 min-h-9 ${
				isActive
					? '!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg text-blue-900'
					: ''
			}`}
		>
			<HashIcon className="w-4 h-4 text-[#9b9b9b] mr-2" />
			<span className="str-chat__channel-preview-messenger-name flex-1">{channel.data.id}</span>

			{unreadCount > 0 && (
				<span className="flex items-center justify-center ml-2 size-4 text-xs rounded-full bg-red-500 ">
					{unreadCount}
				</span>
			)}
		</button>
	);
};
export default CustomChannelPreview;
