import {combineReducers} from 'redux'
import { authReducer } from './auth'
import { customerReducer } from './customers'
import { productReducer } from './products'
import { transactionReducer } from './transactions'

export const reducers = combineReducers({
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    transaction: transactionReducer
})