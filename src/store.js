import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import allReducers from './reducers/index';

// production store
const Store = createStore(allReducers, applyMiddleware(promise));

// development store. comment this part before you push code to github
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// const Store = createStore(allReducers, composeEnhancers(applyMiddleware(promise)));

export default Store;
