import {SET_TOKEN, SET_USER_INFO} from "../types"


export const setUserInfo = (payload) => {
    return {
        type: SET_USER_INFO,
        payload,
    };
};

export const setToken = (payload) => {
    return {
        type: SET_TOKEN,
        payload,
    };
};