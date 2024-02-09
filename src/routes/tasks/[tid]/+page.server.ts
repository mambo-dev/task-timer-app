import { db } from '$lib/db/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { timers } from '$lib/db/schema';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	if (!params.tid) {
		throw new Error('FATAL: no task id provided');
	}

	const taskId = Number(params.tid);

	const taskTimers = await db.query.timers.findMany({
		where: eq(timers.timerTaskId, taskId)
	});

	return {
		timers: taskTimers
	};
};

export const actions: Actions = {
	saveTimer: async ({ request, params }) => {
		const formData = await request.formData();
		const timer = String(formData.get('timer'));
		const taskId = Number(params.tid);
		const hours = Number(timer.split(',')[0]);
		const minutes = Number(timer.split(',')[1]);
		const seconds = Number(timer.split(',')[2]);

		await db
			.insert(timers)
			.values({ hours, minute: minutes, second: seconds, timerTaskId: taskId });
	}
};
