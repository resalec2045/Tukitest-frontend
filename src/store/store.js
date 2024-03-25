import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './auth/authSlice';
import { quizsSliceReducer } from './quiz/quizSlice';

export const store = configureStore({
	reducer: {
		auth: authSliceReducer,
		quiz: quizsSliceReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
