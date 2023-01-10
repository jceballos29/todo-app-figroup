/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import './styles/Upcoming.css';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { Task } from '../../types';
import { TaskCrad } from '../../components/TaskCrad';

export interface UpcomingInterface {}

export interface UpcomingState {
	tasks: Array<Task>;
}

const Upcoming: React.FC<UpcomingInterface> = () => {
	const date = useMemo(() => new Date(), []);
	const { tasks: data } = useSelector(
		(store: AppStore) => store.tasks,
	);
	const [tasks, setTasks] = useState<UpcomingState['tasks']>([]);

	useEffect(() => {
		setTasks(
			data.filter(
				(task: Task) =>
					!task.completed &&
					task.scheduleAt.setHours(0, 0, 0, 0) >
						new Date().setHours(0, 0, 0, 0),
			),
		);
	}, [data, date]);

	return (
		<div className='upcoming'>
			<header className='page__header'>
				<h2>Upcoming</h2>
			</header>
			<div className='page__content'>
				{tasks.length > 0 ? (
					tasks.map((task: Task) => (
						<TaskCrad key={task.id} content={task} />
					))
				) : (
					<p className='no__tasks'>No scheduled tasks</p>
				)}
			</div>
		</div>
	);
};

export default Upcoming;
