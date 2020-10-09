import { BaseAction } from '../BaseAction';
import { actionTypes as types } from './actionTypes';

export const changeData = (data): BaseAction => ({
  type: types.CHANGE_DATA,
  payload: { data },
});

export const fetchData = ({ min, max, count }): BaseAction => ({
  type: types.FETCH_DATA,
  payload: { min, max, count },
});
