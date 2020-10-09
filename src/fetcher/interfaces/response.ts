export default interface BaseResponse<T> {
  data?: T;
  success?: boolean;
  errors?: Array<string>;
}
