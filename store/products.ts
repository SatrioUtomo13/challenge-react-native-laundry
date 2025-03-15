const INITIAL_STATE = {
    products : [],
    form: {
        name: '',
        price: 0,
        type: ''
    },
    selectedProduct: null
}

export const productReducer = (state = INITIAL_STATE, action: any) => {

    switch(action.type) {
        case "FETCH_PRODUCTS":
            return {...state, products: action.payload}

        case "CREATE_PRODUCT":
            return {...state, products: [...state.products, action.payload]}

        case "DELETE_PRODUCT": 
            return {...state, products: state.products.filter((product: any) => product.id !== action.payload)}

        case "UPDATE_PRODUCT":
            return {...state, products: state.products.map((product: any) => product.id === action.payload.id ? action.payload : product)}

        case "SET_FORM":
            return {...state, form: {...state.form, [action.field]: action.value}}

        case "SET_SELECTED_PRODUCT":
            return {...state, selectedProduct: action.payload}

        default:
            return state
    }
}