import { BaseAction } from 'src/actions/BaseAction';
import { actionTypes as types } from 'src/actions/example/actionTypes';

export interface ExampleStore {
  data: string;
}

const initialState: ExampleStore = {
  data: 'initial cpu state',
};

export default function (state: ExampleStore = initialState, action: BaseAction) {
  switch (action.type) {
    case types.CHANGE_DATA: {
      return {
        ...state,
        data: 'current core temperature is ' + action.payload.data.core,
      };
    }
    case types.FETCH_DATA: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
