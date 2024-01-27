import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLoadTopicById,
  apiLoadTopicsByCourse,
  apiUpdateTopic,
} from '../../api/topicApi';

export const requestLoadTopicByCourse = createAsyncThunk(
  'topic/requestLoadTopicByCourse',
  async (props) => {
    const res = await apiLoadTopicsByCourse(props);
    return res.data;
  }
);

export const requestLoadTopicById = createAsyncThunk(
  'topic/requestLoadTopicById',
  async (props) => {
    const res = await apiLoadTopicById(props);
    return res.data;
  }
);

export const requestUpdateTopic = createAsyncThunk(
  'topic/requestUpdateTopic',
  async (props) => {
    const res = await apiUpdateTopic(props);
    return res.data;
  }
);
