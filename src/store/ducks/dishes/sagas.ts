import { takeLatest, put, call, all } from 'redux-saga/effects';
import api from '@api';
import { Types, Creators as DishesCreators } from './dishes';

function* fetchDishes() {
    const dishes = yield call(api.dishes.get);
    yield put(DishesCreators.setAll(dishes));
}

function* sagaRoot(): Generator {
    yield all([takeLatest(Types.FETCH_DISHES, fetchDishes)]);
}

export default sagaRoot;
