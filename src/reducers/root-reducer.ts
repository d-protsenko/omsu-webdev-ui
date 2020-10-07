import { combineReducers } from 'redux';

import exampleReducer from './example';

export const rootReducer = combineReducers({
    exampleReducer
});

export type AppState = ReturnType<typeof rootReducer>;