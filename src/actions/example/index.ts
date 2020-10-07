import { BaseAction } from '../BaseAction';
import { actionTypes as types } from './actionTypes';

export const changeData = (data: string): BaseAction => ({
    type: types.CHANGE_DATA,
    payload: { data },
});

export const fetchData = (): BaseAction => ({
    type: types.FETCH_DATA,
});
