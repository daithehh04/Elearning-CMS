import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLoadQuestionsByIdTopic,
  apiUpdateQuestion,
} from '../../api/questionApi';

export const requestLoadQuestionsByIdTopic = createAsyncThunk(
  'question/requestLoadQuestionsByIdTopic',
  async (props) => {
    const res = await apiLoadQuestionsByIdTopic(props);
    return res.data;
  }
);

export const requestUpdateQuestion = createAsyncThunk(
  'question/requestUpdateQuestion',
  async (props) => {
    const res = await apiUpdateQuestion(props);
    return res.data;
  }
);
