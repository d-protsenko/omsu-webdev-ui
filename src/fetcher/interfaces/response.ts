export interface BaseResponse<T> {
  data?: T;
  success?: boolean;
  errors?: Array<string>;
}
export interface PagedResponse<T> {
  content?: Array<T>;
  totalPages?: number;
  totalEntities?: number;
}
