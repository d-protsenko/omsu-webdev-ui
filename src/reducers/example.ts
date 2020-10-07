import { BaseAction } from 'src/actions/BaseAction';
import { actionTypes as types } from 'src/actions/example/actionTypes';

export interface ExampleStore {
    data: string;
}

const initialState: ExampleStore = {
    data: 'Example data',
};

export default function(
    state: ExampleStore = initialState,
    action: BaseAction
) {
    switch (action.type) {
        case types.CHANGE_DATA: {
            return {
                ...state,
                data: action.payload.data,
            };
        }
        default:
            return state;
    }
}
