import { Inngest } from 'inngest';
import connectDB from '../config/db.config.js';
import { User } from '../models/user.model.js'; // Import the User model
import { deleteStreamUser, upsertStreamUser } from '../config/stream.config.js';

// Create a client to send and receive events
export const inngest = new Inngest({ id: 'slack-clone' });

const syncUser = inngest.createFunction(
	{ id: 'sync-user' },
	{ event: 'clerk/user.created' },
	async ({ event }) => {
		await connectDB();

		const { id, email_addresses, first_name, last_name, image_url } = event.data;

		const newUser = {
			clerkId: id,
			email: email_addresses[0]?.email_address,
			name: `${first_name || ''} ${last_name || ''}`,
			image: image_url,
		};

		await User.create(newUser);

		// await upsertStreamUser({
		// 	id: newUser.clerkId.toString(),
		// 	name: newUser.name,
		// 	image: newUser.image,
		// });

		// await addUserToPublicChannels(newUser.clerkId.toString());
	}
);

const deleteUserFromDB = inngest.createFunction(
	{ id: 'delete-user-from-db' },
	{ event: 'clerk/user.deleted' },
	async ({ event }) => {
		await connectDB();
		const { id } = event.data;
		await User.deleteOne({ clerkId: id });

		// await deleteStreamUser(id.toString());
	}
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
