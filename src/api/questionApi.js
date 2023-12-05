import ENDPONTAPI from '../helpers/endpoint';
import { ApiConfig } from './config';

export const apiLoadQuestionsByIdTopic = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_QUESTIONS_BY_TOPIC, {
    params: payload,
  });
};

export const apiUpdateQuestion = async (payload) => {
  return ApiConfig(ENDPONTAPI.UPDATE_QUESTION, {
    payload,
  });
};
