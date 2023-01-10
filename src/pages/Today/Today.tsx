/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import './styles/Today.css';
import { useSelector } from 'react-redux';
import { Task } from '../../types';
import { AppStore } from '../../redux/store';
import { TaskCrad } from '../../components/TaskCrad';

export interface TodayInterface {}

export interface TodayState {
	tasks: Array<Task>;
}

const Today: React.FC<TodayInterface> = () => {
	const date = useMemo(() => new Date(), []);
	const { tasks: data } = useSelector(
		(store: AppStore) => store.tasks,
	);
	const [tasks, setTasks] = useState<TodayState['tasks']>([]);

	useEffect(() => {
		setTasks(
			data.filter(
				(task: Task) =>
					!task.completed &&
					task.scheduleAt.setHours(0, 0, 0, 0) ===
						new Date().setHours(0, 0, 0, 0),
			),
		);
	}, [data, date]);

	return (
		<div className='today'>
			<header className='page__header'>
				<h2>Today</h2>
			</header>
			<div className='page__content'>
				{tasks.length > 0 ? (
					tasks.map((task: Task) => (
						<TaskCrad key={task.id} content={task} />
					))
				) : (
					<p className='no__tasks'>No tasks for today</p>
				)}
			</div>
		</div>
	);
};

export default Today;
