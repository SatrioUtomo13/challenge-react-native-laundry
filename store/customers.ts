const INITIAL_STATE = {
    customers : [],
    form: {
        name: '',
        phoneNumber: '',
        address: ''
    },
    selectedCustomer: null
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

        case "SET_FORM":
            return {...state, form: {...state.form, [action.field]: action.value}}

        case "SET_SELECTED_CUSTOMER":
            return {...state, selectedCustomer: action.payload}
        
        default:
            return state
    }

}