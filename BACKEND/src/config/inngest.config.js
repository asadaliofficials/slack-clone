import { Inngest } from 'inngest';
import { User } from '../models/user.model.js';
import connectDB from './db.config.js';
import { deleteStreamUser, upsertStreamUser } from './stream.config.js';
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
			name: `${first_name || 'john'} ${last_name || 'doe'}`,
			image: image_url,
		};

		try {
			await User.create(newUser);
		} catch (error) {
			console.log(error);
		}

		await upsertStreamUser({
			id: newUser.clerkId.toStrong(),
			name: newUser.name,
			image: newUser.image,
		});
	}
);

const deleteUserFromDB = inngest.createFunction(
	{ id: 'delete-user-from-db' },
	{ event: 'clerk/user.deleted' },
	async ({ event }) => {
		await connectDB();
		const { id } = event.data;
		try {
			await User.deleteOne({ clerkId: id });
		} catch (error) {
			console.log(error);
		}

		await deleteStreamUser(id.toStrong());
	}
);

export const functions = [syncUser, deleteUserFromDB];
