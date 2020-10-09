import routesMock from 'src/api/routesMock';

export default (url: string) => `/mockapi/${routesMock[url]}.json`;
