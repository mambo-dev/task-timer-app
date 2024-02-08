import { db } from '$lib/db/db';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { tasks } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

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

export const actions: Actions = {
	addTask: async ({ request }) => {
		try {
			const formData = await request.formData();
			const taskTitle = formData.get('taskTitle');

			if (!taskTitle) {
				return fail(422, {
					error: 'Please provide a title for your task'
				});
			}

			await db.insert(tasks).values({ title: String(taskTitle) });

			return {
				done: true
			};
		} catch (error: any) {
			return fail(500, { error: error.message });
		}
	},
	deleteTask: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('taskId'));
		await db.delete(tasks).where(eq(tasks.id, id));

		return true;
	}
};
