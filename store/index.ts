import {combineReducers} from 'redux'
import { customerReducer } from './customers'

export const reducers = combineReducers({
    customer: customerReducer
})