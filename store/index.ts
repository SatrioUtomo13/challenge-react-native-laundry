import {combineReducers} from 'redux'
import { customerReducer } from './customers'
import { productReducer } from './products'

export const reducers = combineReducers({
    customer: customerReducer,
    product: productReducer
})