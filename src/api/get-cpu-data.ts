import BaseResponse from 'src/fetcher/interfaces/response';
import fetch from 'src/fetcher/fetch';

export const getCPUData = (): Promise<BaseResponse> => {
  return fetch(`cpu-data`);
};
