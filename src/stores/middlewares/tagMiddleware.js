import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLoadTags,
  apiLoadTagsByIdCategory,
  apiUpdateTag,
} from '../../api/tagApi';

export const requestLoadTags = createAsyncThunk(
  'tag/loadTags',
  async (props) => {
    const res = await apiLoadTags(props);
    return res.data;
  }
);

export const requestLoadTagsByIdCategory = createAsyncThunk(
  'tag/loadTagsByIdCategory',
  async (props) => {
    const res = await apiLoadTagsByIdCategory(props);
    return res.data;
  }
);

export const requestUpdateTag = createAsyncThunk(
  'tag/updateTag',
  async (props) => {
    const res = await apiUpdateTag(props);
    return res.data;
  }
);
