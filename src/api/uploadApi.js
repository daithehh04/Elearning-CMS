import ENDPONTAPI from '../helpers/endpoint';
import { ApiUploadFile } from './config';

export const apiUploadFile = async (file) => {
  return ApiUploadFile(ENDPONTAPI.UPLOAD, file);
};

export const apiUploadMultipleVideo = async (
  files,
  setProgress,
  onProgress
) => {
  return ApiUploadFile(
    ENDPONTAPI.UPLOAD_MULTIPLE_VIDEO,
    files,
    setProgress,
    onProgress
  );
};
