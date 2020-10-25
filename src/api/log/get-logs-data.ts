import fetch from 'src/fetcher/fetch';
import routes from 'src/api/routes';
import { PagedResponse } from 'src/fetcher/interfaces/response';

interface Log {
  id?: string;
  message: string;
  updatedAt: string;
}

interface GetLogProps {
  size?: number;
  page?: number;
  since?: string;
}

export const getLogsData = (props: GetLogProps): Promise<PagedResponse<Log>> => {
  let size = (props.size as unknown) as string;
  let page = (props.page as unknown) as string;
  let since = (props.since as unknown) as string;
  return fetch(
    routes.getLoggingData +
      '?' +
      new URLSearchParams({
        size,
        page,
        since,
      })
  );
};
