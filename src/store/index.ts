import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { ApplicationState } from './ducks';
import rootSagas from './sagas';

const INITIAL_STATE: ApplicationState = {
    dishes: {
        all: {
            items: [],
            categories: [],
        },
    },
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    (globalThis as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    (globalThis as any).__REDUX_DEVTOOLS_EXTENSION__ ||
    compose;

export default function createStoreWIth(
    initialState: ApplicationState = INITIAL_STATE,
): Store<ApplicationState> {
    const store: Store<ApplicationState> = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSagas);

    return store;
}
