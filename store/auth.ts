const INITIAL_STATE = {
    token: null,
    form: {
        username: '',
        password: ''
    }
}

export const authReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "SET_FORM":
            return { ...state, form: { ...state.form, [action.field]: action.value } };
        case "LOGIN":
            return { ...state, token: action.payload };
        default:
            return state;
    }
};