import axios from 'axios';

export const PREFIX_API = import.meta.env.VITE_APP_PREFIX_API;
export const ENDPOINT_LOCAL = import.meta.env.VITE_APP_ENDPOINT;

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${ENDPOINT_LOCAL}/${PREFIX_API}`;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers['Content-Type'] = 'application/json';

export const ApiConfig = async (
  url,
  data,
  _method = 'POST',
  apiPrefix = PREFIX_API
) => {
  const method = _method.toLowerCase();
  const config = {
    url,
    method,
    data: data?.payload,
    params: data?.params,
  };
  if (apiPrefix !== PREFIX_API)
    config.baseURL = `${ENDPOINT_LOCAL}/${apiPrefix}`;
  return axiosInstance.request(config);
};

export const ApiUploadFile = async (
  url,
  file,
  setProgress,
  onProgress,
  fieldName = 'file'
) => {
  const formData = new FormData();
  if (typeof file === 'object' && file?.length) {
    console.log('array');
    for (let i = 0; i < file?.length; i++) {
      formData.append(fieldName, file[i]);
    }
  } else {
    console.log('not array');
    formData.append(fieldName, file);
  }
  return axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
