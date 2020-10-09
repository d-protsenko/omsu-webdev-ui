import BaseResponse from 'src/fetcher/interfaces/response';
import fetch from 'src/fetcher/fetch';
import routes from './routes';

interface CPUData {
  clock: number;
  usage: number;
  temperature: number;
}

export const getCPUData = (): Promise<BaseResponse<CPUData>> => {
  return fetch(routes.getCPUInfo);
};
