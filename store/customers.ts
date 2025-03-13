const INITIAL_STATE = {
    customers : [],
    message : "halo dunia"
}

export const customerReducer = (state = INITIAL_STATE, action: any) => {

    switch (action.type) {
        case 'FETCH_CUSTOMERS':
            return {...state, customers: action.payload}

        case "CREATE_CUSTOMER":
            return {...state, customers: [...state.customers, action.payload]}

        case "DELETE_CUSTOMER":
            return {...state, customers: state.customers.filter((customer:any) => customer.id !== action.payload)}

        case "UPDATE_CUSTOMER":
            return {...state, customers: state.customers.map((customer:any) => customer.id === action.payload.id ? action.payload : customer)}
        
        default:
            return state
    }

}