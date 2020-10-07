export default (func: any, delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      func().then(resolve, reject);
    }, delay);
  });
};
