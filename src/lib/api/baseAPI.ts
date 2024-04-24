import axios from 'axios';

export const getApi = async (endpoint: string) => {
  let response: undefined | ResponseResult;
  let error;
  try {
    const res = await axios(endpoint);
    response = await res.data;
  } catch (err) {
    error = err;
  }

  return {response, error};
};
