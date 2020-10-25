export default (headers: object = {}) => {
  return new Headers({
    'Content-type': 'application/json',
    ...headers,
  });
};
