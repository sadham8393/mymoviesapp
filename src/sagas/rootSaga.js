
import { all } from 'redux-saga/effects';
import { actionWatcher } from './MoviesSaga';

export default function* rootSaga() {
    yield all([
        actionWatcher()
    ]);
}