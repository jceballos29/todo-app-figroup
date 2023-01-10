/** @format */

import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskCrad } from '../../components/TaskCrad';
import { addTask } from '../../redux/features/taskSlice';
import { AppStore } from '../../redux/store';
import { createTask } from '../../services';
import { NewTask, Task } from '../../types';
import './styles/Home.css';

export interface HomeInterface {}

export interface HomeState {
	tasks: Array<Task>;
}

const Home: React.FC<HomeInterface> = () => {
	const date = useMemo(() => new Date(), []);
	const { tasks: data } = useSelector(
		(store: AppStore) => store.tasks,
	);
	const [tasks, setTasks] = useState<HomeState['tasks']>([]);

	const dispatch = useDispatch();

	useEffect(() => {
		setTasks(
			data.filter(
				(task: Task) =>
					!task.completed &&
					task.scheduleAt.setHours(0, 0, 0, 0) >=
						new Date().setHours(0, 0, 0, 0),
			),
		);
	}, [data, date]);

	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		const newTask: NewTask = {
			task: values.task,
			completed: false,
			priority: parseInt(values.priority),
			scheduleAt: new Date(values.scheduleAt.$d),
		};
		createTask(newTask).then((task: Task) => {
			dispatch(addTask(task));
			form.resetFields();
		});
	};

	return (
		<div className='home'>
			<header className='page__header'>
				<h2>
					Good{' '}
					{date.getHours() < 12
						? 'Morning'
						: date.getHours() < 18
						? 'Afternoon'
						: 'Evening'}
				</h2>
				<p>
					It's{' '}
					{date.toLocaleString('en-US', {
						weekday: 'long',
						month: 'short',
						day: '2-digit',
					})}
					{tasks.length > 0 && (
						<span>
							{' '}
							- {tasks.length} {tasks.length > 1 ? 'tasks' : 'task'}
						</span>
					)}
				</p>
			</header>
			<div className='page__content'>
				<Card style={{ borderRadius: '1rem' }} bordered>
					<Form form={form} onFinish={onFinish}>
						<div
							style={{
								width: '100%',
								display: 'flex',
								gap: '0.5rem',
							}}
						>
							<div
								style={{
									flex: 1,
								}}
							>
								<Form.Item
									name='task'
									rules={[
										{
											required: true,
											message: 'Please input your task!',
										},
									]}
								>
									<Input placeholder='Add a task' />
								</Form.Item>
							</div>
							<div
								style={{
									flex: 1,
									display: 'flex',
									gap: '0.5rem',
								}}
							>
								<Form.Item
									name='scheduleAt'
									style={{
										width: '50%',
									}}
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<DatePicker placeholder='Schedule' />
								</Form.Item>
								<Form.Item
									name='priority'
									style={{
										width: '50%',
									}}
									rules={[
										{
											required: true,
											message: 'Required',
										},
									]}
								>
									<Select placeholder='Priority'>
										<Select.Option value='1'>Low</Select.Option>
										<Select.Option value='2'>Medium</Select.Option>
										<Select.Option value='3'>High</Select.Option>
									</Select>
								</Form.Item>
							</div>
						</div>
						<Button
							type='primary'
							htmlType='submit'
							style={{
								marginLeft: 'auto',
							}}
						>
							Add Task
						</Button>
					</Form>
				</Card>
			</div>
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

export default Home;
