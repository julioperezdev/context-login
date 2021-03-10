import { SET_TOKEN, SET_USER_INFO } from "../types";

export default (state, action) =>{
    const {payload, type} = action

    switch(type){
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: payload
            }
        default:
            return state;
    }
}

/*
const initialState = {
    userInfo: undefined,
    token: undefined,
};

export default function loginReducer(state = initialState, action){
    switch(action.type){
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
}
*/