/** @format */

import { TaskState } from './../../types.d';
import { createSlice } from '@reduxjs/toolkit';

export const INITIL_STATE: TaskState = {
	tasks: [],
	edit: {
		id: 0,
		task: '',
		completed: false,
		priority: 0,
		scheduleAt: new Date(),
	},
	showEdit: false,
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: INITIL_STATE,
	reducers: {
		setTasks: (state, action) => {
			state.tasks = action.payload;
		},
		addTask: (state, action) => {
			state.tasks.push(action.payload);
		},
		updateTask: (state, action) => {
			const task = action.payload;
			const taskIndex = state.tasks.findIndex(
				(t) => t.id === task.id,
			);
			state.tasks[taskIndex] = task;
		},
		removeTask: (state, action) => {
			const task = action.payload;
			const taskIndex = state.tasks.findIndex(
				(t) => t.id === task.id,
			);
			state.tasks.splice(taskIndex, 1);
		},
		handleShowEdit: (state, action) => {
			state.showEdit = action.payload;
		},
		setEditTask: (state, action) => {
			state.edit = action.payload;
		},
	},
});

export const {
	setTasks,
	updateTask,
	removeTask,
	handleShowEdit,
	setEditTask,
	addTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
