/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import './styles/Root.css';
import { EditTask } from '../EditTask';


export interface RootInterface {}

const Root: React.FC<RootInterface> = () => {
	

	return (
		<div className='root'>
			<Sidebar />
			<div className='root_container'>
				<Outlet />
			</div>
			<EditTask />
		</div>
	);
};

export default Root;
