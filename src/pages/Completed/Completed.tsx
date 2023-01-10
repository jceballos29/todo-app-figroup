/** @format */

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskCompletedCard } from '../../components';
import { AppStore } from '../../redux/store';
import { Task } from '../../types';
import './styles/Completed.css';

export interface CompletedInterface {}

export interface UpcomingState {
	tasks: Array<Task>;
}

const Completed: React.FC<CompletedInterface> = () => {
	const date = useMemo(() => new Date(), []);
	const { tasks: data } = useSelector(
		(store: AppStore) => store.tasks,
	);
	const [tasks, setTasks] = useState<UpcomingState['tasks']>([]);

	useEffect(() => {
		setTasks(data.filter((task: Task) => task.completed));
	}, [data, date]);
	return (
		<div className='completed'>
			<header className='page__header'>
				<h2>Completed</h2>
			</header>
			<div className='page__content'>
				{tasks.length > 0 ? (
					tasks.map((task: Task) => (
						<TaskCompletedCard key={task.id} content={task} />
					))
				) : (
					<p className='no__tasks'>No completed tasks</p>
				)}
			</div>
		</div>
	);
};

export default Completed;
