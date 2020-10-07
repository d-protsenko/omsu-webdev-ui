import baseFetch from './components/baseFetch';

import getMockUrl from './components/getMockUrl';
import Options from './interfaces/options';
import Params from './interfaces/params';

const isMock = !!process.env.REACT_APP_MOCKS;

export default (url: string, options: Options = {}, params: Params = {}) => {
  params.isMock = params.isMock !== undefined ? params.isMock : isMock;

  if (params.isMock) {
    options = {
      ...options,
      method: 'GET',
    };
    url = getMockUrl(url);
    return baseFetch(url);
  }
  return baseFetch(url, options, params);
};
