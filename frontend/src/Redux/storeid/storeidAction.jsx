/* eslint-disable no-unused-vars */
import { idSlice } from "./storeidSlice";

const idActions = idSlice.actions;

//Set id
export const setidAction = (id) => async (dispatch) => {
    try {
        dispatch(idActions.setIdResponse({ id }));
    } catch (error) {
        console.log(error);
    }
    }



