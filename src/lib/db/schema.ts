import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

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

export const timers = pgTable('timers', {
	id: serial('id').primaryKey(),
	hours: integer('hours').default(0),
	minute: integer('minutes').default(0),
	second: integer('seconds').default(0),
	timerTaskId: integer('timer_task_id')
		.references(() => tasks.id)
		.notNull()
});

export type Timers = typeof timers.$inferSelect;
export type Task = typeof tasks.$inferSelect;
