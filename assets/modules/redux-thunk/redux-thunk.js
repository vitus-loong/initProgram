import thunkMiddleware from 'redux-thunk';

if (typeof window.thunkMiddleware == 'undefined') {
    window.thunkMiddleware = thunkMiddleware;
}
export default thunkMiddleware;