import { all, fork } from 'redux-saga/effects';

import { fetchCPUDataExampleWatcher, setCPUDataExampleWatcher } from 'src/elements/containers/example/sagas';

export const rootSaga = function* root() {
  yield all([fork(fetchCPUDataExampleWatcher), fork(setCPUDataExampleWatcher)]);
};
