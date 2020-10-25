import fetch from 'src/fetcher/fetch';
import routes from 'src/api/routes';

interface RamResponse {
  id: string;
  total: number;
  available: number;
  free: number;
  used: number;
  updatedAt: string;
}

interface RamData {
  total?: number;
  available?: number;
  free?: number;
  used: number;
  updatedAt: string;
}

export const createRAMData = (body: RamData): Promise<RamResponse> => {
  return fetch(routes.createRAMInfo, { method: 'POST', body });
};
