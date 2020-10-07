import {call, put, select, takeLatest} from '@redux-saga/core/effects';

import {actionTypes} from 'src/actions/example/actionTypes';
import {changeData, fetchData} from 'src/actions/example';
import {getCPUData} from 'src/api/get-cpu-data';

export function* fetchCPUDataExampleWatcher() {
    yield takeLatest(
        [actionTypes.FETCH_DATA],
        getCPUDataSaga
    );
}

export function* setCPUDataExampleWatcher() {
    yield takeLatest(
        [actionTypes.CHANGE_DATA],
        () => {
        }
    );
}

export function* getCPUDataSaga() {
    try {
        const {
            exampleReducer:
                {data: oldData}
        } = yield select();
        const {data} = yield call(getCPUData);
        yield put(changeData(data));
    } catch (e) {
        // TODO: add errors handling
    }
}

