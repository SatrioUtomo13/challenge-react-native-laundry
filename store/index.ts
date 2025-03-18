import {combineReducers} from 'redux'
import { customerReducer } from './customers'
import { productReducer } from './products'
import { transactionReducer } from './transactions'

export const reducers = combineReducers({
    customer: customerReducer,
    product: productReducer,
    transaction: transactionReducer
})