import { createBrowserHistory } from 'history';

let lastLocation: History = {
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
};

export interface History {
  pathname: string;
  search: string;
  hash: string;
  state?: any;
}

const history: any = createBrowserHistory({});
const prevHistoryPush = history.push;

history.listen((location: any) => {
  lastLocation = location;
});

history.push = (path: string | History, state?: any) => {
  const pathname =
    typeof path !== 'string' ? path.pathname + path.search + path.hash : path;
  state = typeof path !== 'string' ? path.state : state;

  if (
    pathname !==
      lastLocation.pathname + lastLocation.search + lastLocation.hash ||
    JSON.stringify(state || {}) !== JSON.stringify(lastLocation.state || {})
  ) {
    prevHistoryPush(path, state || {});
  }
};

export default history;
