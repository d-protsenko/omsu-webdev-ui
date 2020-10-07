export default (body?: object) => {
  if (!body) {
    return null;
  }
  return JSON.stringify(body);
};
