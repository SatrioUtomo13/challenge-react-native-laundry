const INITIAL_STATE = {
    transactions: [],
    form: {
        customerId: '',
        billDetails: [
            {
                product: {
                    id: ''
                },
                qty: 0
            }
        ]
    },
    selectedTransaction: null
}

export const transactionReducer = (state = INITIAL_STATE, action: any) => {

    switch (action.type) {
        case "FETCH_TRANSACTIONS":
            return { ...state, transactions: action.payload }

        case "CREATE_TRANSACTION":
            return { ...state, transactions: [...state.transactions, action.payload] }

        case 'SET_FORM':
            return {...state, form: {...state.form, ...action.payload}}

        default:
            return state
    }
}