import { createSlice } from '@reduxjs/toolkit';
import {
  requestLoadTags,
  requestLoadTagsByIdCategory,
  requestUpdateTag,
} from '../middlewares/tagMiddleware';

// Define the initial state using that type
const initialState = {
  tags: [],
  loading: false,
  error: '',
  tagInfo: null,
};

export const tagSlice = createSlice({
  name: 'tag',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [
      requestLoadTags,
      requestUpdateTag,
      requestLoadTagsByIdCategory,
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

    // load
    builder.addCase(requestLoadTags.fulfilled, (state, action) => {
      state.loading = false;
      state.tags = action.payload.data;
    });

    // load tag by id category
    builder.addCase(requestLoadTagsByIdCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.tags = action.payload.data;
    });

    // update
    builder.addCase(requestUpdateTag.fulfilled, (state, action) => {
      state.loading = false;
      state.tagInfo = action.payload.data;
    });
  },
});

export const {} = tagSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const tagState = (state) => state.tag;

export default tagSlice.reducer;
