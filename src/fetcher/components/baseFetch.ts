import { env } from 'process';
import BaseError from '../../baseError/BaseError';
import errorhandler from '../../services/requestErrorHandler/RequestErrorHandler';

import getPreparedBody from './getPreparedBody';
import getPreparedHeaders from './getPreparedHeaders';
import withDelay from './withDelay';
import withTimeout from './withTimeout';
import Options from '../interfaces/options';
import Params from '../interfaces/params';

const defTimeout = parseInt(env.REACT_APP_REQUEST_TIMEOUT || '10000');
const defDelay = parseInt(env.REACT_APP_REQUEST_DELAY || '0');

const checkStatus = (response: any) => {
  if ((response.status >= 200 && response.status <= 300) || response.ok) {
    return response;
  }
  throw new BaseError({
    status: response.status,
  });
};

const getPreparedOptions = (options: Options = {}) => {
  return {
    ...options,
    headers: getPreparedHeaders(options.headers),
    body: getPreparedBody(options.body),
  };
};

const baseFetch = (url: string, options: Options = {}, params: Params = {}) => {
  const preparedOptions = getPreparedOptions(options);
  const timeout = params.timeout || defTimeout;
  const delay = params.delay || defDelay;

  const request = () => fetch(url, preparedOptions);
  return withTimeout(withDelay(request, delay), timeout)
    .then(response => checkStatus(response))
    .then(response => response.json())
    .catch(error => errorhandler(error));
};

export default baseFetch;
