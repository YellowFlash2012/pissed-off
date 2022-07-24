import { configureStore } from '@reduxjs/toolkit';
import authreducer from '../features/authSlice';
import reviewsReducer from '../features/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authreducer,
    reviews: reviewsReducer
  },
});
