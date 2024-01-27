import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/categorySlice';
import courseReducer from './slices/courseSlice';
import tagReducer from './slices/tagSlice';
import topicReducer from './slices/topicSlice';
import questionReducer from './slices/questionSlice';
import userReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    course: courseReducer,
    tag: tagReducer,
    topic: topicReducer,
    question: questionReducer,
    user: userReducer,
  },
});
