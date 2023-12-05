import { createSlice } from '@reduxjs/toolkit';
import {
  requestLoadCategorys,
  requestUpdateCategorys,
} from '../middlewares/categoryMiddleware';

// Define the initial state using that type
const initialState = {
  categorys: [],
  loading: false,
  error: '',
  categoryInfo: null,
};

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCategoryInfo: (state, action) => {
      state.categoryInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    const actionList = [requestLoadCategorys, requestUpdateCategorys];
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
    builder.addCase(requestLoadCategorys.fulfilled, (state, action) => {
      state.loading = false;
      state.categorys = action.payload.data;
    });

    // order category
    // builder.addCase(requestOrderCategory.fulfilled, (state, action: PayloadAction<{
    //   data: Category[],
    //   status: number
    // }>) => {
    //   state.loading = false;
    // })

    builder.addCase(requestUpdateCategorys.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryInfo = action.payload.data;
    });
  },
});

export const { setCategoryInfo } = categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const categoryState = (state) => state.category;

export default categorySlice.reducer;
