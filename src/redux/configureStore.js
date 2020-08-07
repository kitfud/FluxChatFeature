import {createStore, combineReducers,applyMiddleware} from 'redux';
import {Slides} from './slides'
import { Auth } from './auth';
import { Comments } from './comments';

import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            slides: Slides,
            auth: Auth,
            comments:Comments
        }),
        applyMiddleware(thunk, logger)
    );
    return store
}