import { db } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const tasks = await db.query.tasks.findMany({
		with: {
			timer: true
		}
	});

	return {
		tasks
	};
};
