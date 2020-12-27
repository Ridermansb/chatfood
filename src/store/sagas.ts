import { default as dishesSagas } from './ducks/dishes/sagas';
import { fork, all } from 'redux-saga/effects';

export default function* rootSaga(): Generator {
    yield all([fork(dishesSagas)]);
}
