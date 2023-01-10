/** @format */

import React from 'react';
import './styles/EditTask.css';
import {
	Drawer,
	Form,
	Input,
	Select,
	DatePicker,
	Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
	handleShowEdit,
	removeTask,
	setEditTask,
	updateTask,
} from '../../redux/features/taskSlice';
import { AppStore } from '../../redux/store';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { deleteTask, editTask } from '../../services';
import { Task } from '../../types';

dayjs.extend(customParseFormat);

export interface EditTaskInterface {}

const dateFormat = 'YYYY-MM-DD';

const EditTask: React.FC<EditTaskInterface> = () => {
	const { showEdit, edit } = useSelector(
		(store: AppStore) => store.tasks,
	);
	const dispatch = useDispatch();

	const onClose = () => {
		dispatch(
			setEditTask({
				id: 0,
				task: '',
				completed: false,
				priority: 0,
				scheduleAt: new Date(),
			}),
		);
		dispatch(handleShowEdit(false));
	};

	const onFinish = (values: any) => {
		const edited: Task = {
			id: edit.id,
			task: values.task,
			completed: edit.completed,
			priority: parseInt(values.priority),
			scheduleAt: new Date(values.scheduleAt.$d),
		};
		editTask(edited).then((task: Task) => {
			dispatch(updateTask(task));
			onClose();
		});
	};

	const hanldeDelete = () => {
		deleteTask(edit).then((task: Task) => {
			dispatch(removeTask(task));
			onClose();
		});
	};

	return (
		<Drawer
			contentWrapperStyle={{ padding: '0.5rem', boxShadow: 'none' }}
			headerStyle={{ border: 'none', justifyItems: 'end' }}
			bodyStyle={{
				display: 'flex',
				flexDirection: 'column',
			}}
			mask={false}
			closable={true}
			className='edittask'
			placement='right'
			onClose={onClose}
			open={showEdit}
			getContainer={false}
		>
			{edit.id !== 0 && (
				<Form
					onFinish={onFinish}
					initialValues={{
						task: edit.task,
						priority: edit.priority.toString(),
						scheduleAt: dayjs(
							edit.scheduleAt.toISOString().split('T')[0],
							dateFormat,
						),
					}}
				>
					<Form.Item name='task'>
						<Input />
					</Form.Item>
					<Form.Item
						label='Due date'
						name='scheduleAt'
						labelAlign='left'
						labelCol={{ span: 12 }}
						wrapperCol={{ span: 12 }}
					>
						<DatePicker format={dateFormat} />
					</Form.Item>
					<Form.Item
						label='Priority'
						name='priority'
						labelAlign='left'
						labelCol={{ span: 12 }}
						wrapperCol={{ span: 12 }}
					>
						<Select
							style={{ width: '100%' }}
							options={[
								{ label: 'Low', value: '1' },
								{ label: 'Medium', value: '2' },
								{ label: 'High', value: '3' },
							]}
						></Select>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							Save
						</Button>
					</Form.Item>
				</Form>
			)}
			<div
				style={{
					marginTop: 'auto',
				}}
			>
				<Button type='primary' danger block onClick={hanldeDelete}>
					Delete
				</Button>
			</div>
		</Drawer>
	);
};

export default EditTask;
