import { relations } from 'drizzle-orm';
import { date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const tasks = pgTable('task', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull()
});

export const tasksRelations = relations(tasks, ({ one }) => ({
	timer: one(timers, {
		fields: [tasks.id],
		references: [timers.timerTaskId]
	})
}));

export const timers = pgTable('timer', {
	id: serial('id').primaryKey(),
	startTime: date('startTime'),
	duration: varchar('duration'),
	endTime: date('endTime'),
	timerTaskId: integer('timer_task_id')
		.references(() => tasks.id)
		.notNull()
});

export type Timers = typeof timers.$inferSelect;
export type Task = typeof tasks.$inferSelect;
