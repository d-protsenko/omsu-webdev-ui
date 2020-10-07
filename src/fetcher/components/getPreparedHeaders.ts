export default (headers: object = {}) => {
  return new Headers({ ...headers });
};
