export default interface BaseResponse {
  data?: any;
  success?: boolean;
  errors?: Array<string>;
}
