import fetch from 'src/fetcher/fetch';
import routes from 'src/api/routes';

interface CpuResponse {
  id: string;
  threads: number;
  cores: number;
  clock: number;
  cpuUsage: number;
  updatedAt: string;
}

interface CPUData {
  threads?: number;
  cores?: number;
  clock?: number;
  cpuUsage: number;
  updatedAt: string;
}

export const createCPUData = (body: CPUData): Promise<CpuResponse> => {
  return fetch(routes.createCPUInfo, { method: 'POST', body });
};
