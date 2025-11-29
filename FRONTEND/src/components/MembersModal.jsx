import { XIcon } from 'lucide-react';

function MembersModal({ members, onClose }) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
				{/* HEADER */}
				<div className="flex items-center justify-between border-b px-6 py-4">
					<h2 className="text-2xl font-semibold">Channel Members</h2>
					<button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				{/* MEMBERS LIST */}
				<div className="px-6 py-4 max-h-96 overflow-y-auto">
					{members.map(member => (
						<div
							key={member.user.id}
							className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0"
						>
							{member.user?.image ? (
								<img
									src={member.user.image}
									alt={member.user.name}
									className="size-9 rounded-full object-cover"
								/>
							) : (
								<div className="size-9 rounded-full bg-gray-400 flex items-center justify-center">
									<span className="text-white">
										{(member.user.name || member.user.id).charAt(0).toUpperCase()}
									</span>
								</div>
							)}

							<div className="text-sm font-medium text-gray-700 mb-1">
								{member.user.name || member.user.id}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default MembersModal;
