import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLoadCategorys,
  apiOrderCategory,
  apiUpdateCategory,
} from '../../api/categoryApi';

export const requestLoadCategorys = createAsyncThunk(
  'category/loadCategorys',
  async (props) => {
    const res = await apiLoadCategorys(props);
    return res.data;
  }
);

export const requestUpdateCategorys = createAsyncThunk(
  'category/updateCategorys',
  async (props) => {
    const res = await apiUpdateCategory(props);
    return res.data;
  }
);

export const requestOrderCategory = createAsyncThunk(
  'category/orderCategory',
  async (props) => {
    const res = await apiOrderCategory(props);
    return res.data;
  }
);
