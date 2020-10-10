import BaseResponse from 'src/fetcher/interfaces/response';
import fetch from 'src/fetcher/fetch';
import routes from './routes';

interface RAMData {
  usage: number;
}

export const getRAMData = (): Promise<BaseResponse<RAMData>> => {
  return fetch(routes.getRAMInfo);
};
