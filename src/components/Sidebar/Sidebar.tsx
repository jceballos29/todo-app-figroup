/** @format */

import React from 'react';
import './styles/Sidebar.css';
import { Menu } from 'antd';
import {
	HomeOutlined,
	CalendarOutlined,
	CheckCircleOutlined,
	ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export interface SidebarInterface {}

const Sidebar: React.FC<SidebarInterface> = () => {

	const navigate = useNavigate()

	return (
		<div className='sidebar'>
			<Menu
				onClick={({key}) => navigate(key)}
				defaultSelectedKeys={['/home']}
				style={{ border: 'none', userSelect: 'none' }}
				items={[
					{
						key: '/home',
						label: 'Home',
						icon: <HomeOutlined />,
					},
					{
						key: '/today',
						label: 'Today',
						icon: <ProfileOutlined />,
					},
					{
						key: '/upcoming',
						label: 'Upcoming',
						icon: <CalendarOutlined />,
					},
					{
						key: '/completed',
						label: 'Completed',
						icon: <CheckCircleOutlined />,
					},
				]}
			></Menu>
		</div>
	);
};

export default Sidebar;
