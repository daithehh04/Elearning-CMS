import { createSlice } from '@reduxjs/toolkit';
import {
  requestLoadTopicByCourse,
  requestLoadTopicById,
  requestUpdateTopic,
} from '../middlewares/topicMiddleware';

// Define the initial state using that type
const initialState = {
  loading: false,
  error: '',
  topics: [],
  dataTopic: null,
};

export const topicSlice = createSlice({
  name: 'topic',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDataTopic: (state, action) => {
      state.dataTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    const actionList = [
      requestLoadTopicByCourse,
      requestUpdateTopic,
      requestLoadTopicById,
    ];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
    });
    actionList.forEach((action) => {
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    // load topic by id Course
    builder.addCase(requestLoadTopicByCourse.fulfilled, (state, action) => {
      state.topics = action.payload.data;
      state.loading = false;
    });

    // requestUpdateTopic
    builder.addCase(requestUpdateTopic.fulfilled, (state, action) => {
      state.loading = false;
    });

    // requestLoadTopicById
    builder.addCase(requestLoadTopicById.fulfilled, (state, action) => {
      state.loading = false;
      state.dataTopic = action.payload;
    });
  },
});

export const { setDataTopic } = topicSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const topicState = (state) => state.topic;

export default topicSlice.reducer;
