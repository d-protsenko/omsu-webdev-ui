import fetch from 'src/fetcher/fetch';
import routes from './routes';
import { PagedResponse } from 'src/fetcher/interfaces/response';

interface RamResponse {
  id: string;
  total: number;
  available: number;
  free: number;
  used: number;
  updatedAt: string;
}

export const getRAMData = (): Promise<PagedResponse<RamResponse>> => {
  return fetch(routes.getRAMInfo);
};
