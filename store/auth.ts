const INITIAL_STATE = {
    token: null,
    loginForm: {
        username: '',
        password: ''
    },
    registerForm: {
        name: '',
        email: '',
        username: '',
        password: '',
        role: ''
    }
}

export const authReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "SET_LOGIN_FORM":
            return { ...state, loginForm: { ...state.loginForm, [action.field]: action.value } };

        case "SET_REGISTER_FORM":
            return { ...state, registerForm: {...state.registerForm, [action.field]: action.value} };

        case "LOGIN":
            return { ...state, token: action.payload };

        default:
            return state;
    }
};