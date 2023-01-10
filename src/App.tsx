/** @format */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import { Root } from './components';
import { Completed, Home, Today, Upcoming } from './pages';
import { setTasks } from './redux/features/taskSlice';
import { getAllTasks } from './services';
import { Task } from './types';
import { Spin } from 'antd'

export interface AppInterface {}

let router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <Navigate to='/home' />,
			},
			{
				path: 'home',
				element: <Home />,
			},
			{
				path: 'today',
				element: <Today />,
			},
			{
				path: 'upcoming',
				element: <Upcoming />,
			},
			{
				path: 'completed',
				element: <Completed />,
			},
			{
				path: '*',
				element: <div>Error</div>,
			},
		],
	},
]);

const App: React.FC<AppInterface> = () => {
	const dispatch = useDispatch();
	const [ loading, setLoading ] = React.useState<boolean>(true)

	useEffect(() => {
		getAllTasks().then((tasks: Array<Task>) => {
			dispatch(setTasks(tasks));
			setLoading(false)
		});
	}, [dispatch]);

	return (
		<div className='App'>
			{
				loading ? <Spin size="large" /> : <RouterProvider router={router} />
			}
		</div>
	);
};

export default App;
