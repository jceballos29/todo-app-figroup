/** @format */

import React from 'react';
import './styles/TaskCrad.css';
import { Task } from '../../types';
import { Card, Checkbox, Tag, Button, Dropdown } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { MenuProps } from 'antd';
import { completeTask, deleteTask } from '../../services';
import { useDispatch } from 'react-redux';
import {
	handleShowEdit,
	removeTask,
	setEditTask,
	updateTask,
} from '../../redux/features/taskSlice';
import {
	EditOutlined,
	EllipsisOutlined,
	DeleteOutlined,
} from '@ant-design/icons';

export interface TaskCradInterface {
	content: Task;
}

const TaskCrad: React.FC<TaskCradInterface> = ({ content }) => {
	const [isCompleted, setIsCompleted] = React.useState<boolean>(
		content.completed,
	);
	const dispatch = useDispatch();

	const items: MenuProps['items'] = [
		{
			key: 'edit',
			icon: <EditOutlined />,
			label: 'Edit',
		},
		{
			key: 'delete',
			label: 'Delete',
			icon: <DeleteOutlined />,
			danger: true,
		},
	];

	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		if (key === 'delete') {
			handleDelete();
		}
		if (key === 'edit') {
			handleEdit();
		}
	};

	const handleOnCompleted = (e: CheckboxChangeEvent) => {
		setIsCompleted(e.target.checked);
	};

	const handleDelete = () => {
		deleteTask(content).then((task: Task) => {
			dispatch(removeTask(task));
		});
	};

	const handleEdit = () => {
		dispatch(setEditTask(content));
		dispatch(handleShowEdit(true));
	};

	React.useEffect(() => {
		if (isCompleted) {
			completeTask(content).then((task: Task) => {
				dispatch(updateTask(task));
			});
		}
	}, [content, isCompleted, dispatch]);

	return (
		<Card
			style={{ marginBottom: '0.25rem', borderRadius: '1rem' }}
			bodyStyle={{
				padding: 0,
			}}
			bordered
		>
			<div className='taskcrad'>
				<div>
					<Checkbox
						checked={isCompleted}
						onChange={(e) => handleOnCompleted(e)}
					></Checkbox>
					<span
						style={{
							marginLeft: 10,
							textDecoration: `${
								isCompleted ? 'line-through' : 'none'
							}`,
						}}
					>
						{content.task}
					</span>
				</div>
				<div className='taskcrad__tags'>
					<Tag
						style={{
							minWidth: '50px',
							textAlign: 'center',
							userSelect: 'none',
						}}
						color='blue'
					>
						{content.scheduleAt.toLocaleString('en-US', {
							month: 'short',
							day: '2-digit',
						})}
					</Tag>
					<Tag
						style={{
							minWidth: '65px',
							textAlign: 'center',
							userSelect: 'none',
						}}
						color={
							content.priority === 1
								? 'green'
								: content.priority === 2
								? 'orange'
								: 'red'
						}
					>
						{content.priority === 1
							? 'Low'
							: content.priority === 2
							? 'Medium'
							: 'High'}
					</Tag>
					<Dropdown
						menu={{ items, onClick: handleMenuClick }}
						placement='bottomLeft'
					>
						<Button
							type='text'
							icon={<EllipsisOutlined rotate={90} />}
						></Button>
					</Dropdown>
				</div>
			</div>
		</Card>
	);
};

export default TaskCrad;
