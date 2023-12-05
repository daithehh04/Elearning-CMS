import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  requestLoadQuestionsByIdTopic,
  requestUpdateQuestion,
} from '../middlewares/questionMiddleware';

const initialState = {
  questions: [],
  loading: false,
  questionInfo: null,
  total: 0,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionInfo: (state, action) => {
      state.questionInfo = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = _.orderBy(action.payload, ['index'], 'asc');
    },
  },
  extraReducers: (builder) => {
    const actionList = [requestLoadQuestionsByIdTopic, requestUpdateQuestion];
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

    // load by id topic
    builder.addCase(
      requestLoadQuestionsByIdTopic.fulfilled,
      (state, action) => {
        state.loading = false;
        state.questions = _.orderBy(
          action.payload.data,
          ['index'],
          ['asc']
        ).map((question, index) => {
          return {
            ...question,
            index: index + 1,
            answer: _.orderBy(question.answer, ['index'], ['asc']).map(
              (answer, index) => ({
                ...answer,
                index,
              })
            ),
          };
        });
        state.total = action.payload.total;
      }
    );

    // update
    builder.addCase(requestUpdateQuestion.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setQuestionInfo, setQuestions } = questionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const questionState = (state) => state.question;

export default questionSlice.reducer;
