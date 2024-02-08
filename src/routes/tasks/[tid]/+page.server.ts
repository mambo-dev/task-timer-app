import { db } from '$lib/db/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { timers } from '$lib/db/schema';

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
