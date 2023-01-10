/** @format */

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/taskSlice';

export interface AppStore {
	tasks: any;
}

const store = configureStore<AppStore>({
	reducer: {
		tasks: tasksReducer,
	},
});

export default store;
