class BaseError extends Error {
  metaInfo: object;
  constructor(metaInfo: object, ...args: any) {
    super(args);
    this.metaInfo = metaInfo;
  }

  getMetaInfo = () => {
    return this.metaInfo;
  };

  toString = () => {
    return JSON.stringify(this);
  };

  toBase64 = () => {
    let str = this.toString();
    return btoa(str);
  };
}

export default BaseError;
