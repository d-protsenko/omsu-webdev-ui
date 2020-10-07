import BaseError from '../../baseError/BaseError';

export default (promise: any, timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(
        new BaseError({
          status: 'TIMEOUT',
        })
      );
    }, timeout);
    promise.then(resolve, reject);
  });
};
