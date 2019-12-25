import 'modules/redux-thunk/redux-thunk';
import {
    applyMiddleware,
    bindActionCreators,
    combineReducers,
    compose,
    createStore
} from 'modules/redux/redux';
import {
    Provider,
    ReactReduxContext,
    batch,
    connect,
    connectAdvanced,
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    shallowEqual,
    useDispatch,
    useSelector,
    useStore
} from 'modules/react-redux/react-redux';

window.Redux = {
    applyMiddleware: applyMiddleware,
    bindActionCreators: bindActionCreators,
    combineReducers: combineReducers,
    compose: compose,
    createStore: createStore
};

window.ReactRedux = {
    Provider: Provider,
    ReactReduxContext: ReactReduxContext,
    batch: batch,
    connect: connect,
    connectAdvanced: connectAdvanced,
    createDispatchHook: createDispatchHook,
    createSelectorHook: createSelectorHook,
    createStoreHook: createStoreHook,
    shallowEqual: shallowEqual,
    useDispatch: useDispatch,
    useSelector: useSelector,
    useStore: useStore
};
