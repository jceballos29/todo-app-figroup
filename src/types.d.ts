/** @format */

export interface Task {
	id: number;
	task: string;
	completed: boolean;
	priority: number;
	scheduleAt: Date;
}

export interface TaskResponse {
	id: number;
	task: string;
	completed: boolean;
	priority: number;
	scheduleAt: string;
}

export interface TaskState {
	tasks: Array<Task>;
	edit: Task;
	showEdit: boolean
}

export interface NewTask {
	task: string;
	priority: number;
	completed: boolean;
	scheduleAt: Date;
}