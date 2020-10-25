import fetch from 'src/fetcher/fetch';
import routes from 'src/api/routes';
import { PagedResponse } from 'src/fetcher/interfaces/response';

interface CpuResponse {
  id: string;
  threads: number;
  cores: number;
  clock: number;
  cpuUsage: number;
  updatedAt: string;
}

export const getCPUData = (): Promise<PagedResponse<CpuResponse>> => {
  return fetch(routes.getCPUInfo);
};
