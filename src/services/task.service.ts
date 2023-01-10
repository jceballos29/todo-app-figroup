/** @format */

import axios from 'axios';
import { createTaskAdapter } from './../adapters/task.adapter';
import { NewTask, Task, TaskResponse } from './../types.d';

const BASE_URL = 'https://localhost:7153/api/todos';

const fetchTasks = async () => {
	const response = await axios.get<Array<TaskResponse>>(BASE_URL);
	return response.data;
};

export const completeTask = async (task: Task) => {
	const response = await axios.post<TaskResponse>(
		`${BASE_URL}/${task.id}/complete`
	);
	return createTaskAdapter(response.data);
};

export const uncompleteTask = async (task: Task) => {
	const response = await axios.delete<TaskResponse>(
		`${BASE_URL}/${task.id}/complete`
	);
	return createTaskAdapter(response.data);
};

export const createTask = async (task: NewTask) => {
	const response = await axios.post<TaskResponse>(BASE_URL, task);
	return createTaskAdapter(response.data);
}

export const editTask = async (task: Task) => {
	const response = await axios.put<TaskResponse>(
		`${BASE_URL}/${task.id}`,
		task,
	);
	return createTaskAdapter(response.data);
};

export const deleteTask = async (task: Task) => {
	await axios.delete<TaskResponse>(`${BASE_URL}/${task.id}`);
	return task;
};

const mapFromApiToTasks = (
	apiResponse: Array<TaskResponse>,
): Array<Task> => {
	return apiResponse.map((task) => createTaskAdapter(task));
};

export const getAllTasks = async () => {
	const apiResponse = await fetchTasks();
	return mapFromApiToTasks(apiResponse);
};
