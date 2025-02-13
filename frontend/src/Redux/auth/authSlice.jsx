import { createSlice } from "@reduxjs/toolkit";

// Define a function to fetch the initial state
const getInitialAuthState = () => {
  const persistedState = localStorage.getItem("persistroot");
  if (persistedState) {
    console.log("JSON.parse(persistedState)", JSON.parse(persistedState.auth));
    return JSON.parse(persistedState);
  }


  return {
    message: "",
    loggedUser: {
      _id: "",
      username: "",
      email: "",
      role: "",
      secretcode: "",
      block: "",
    },
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    setLoginResponse: (state, action) => {
      return {
        ...state,
        loggedUser: action.payload.loggedUser,
        message: action.payload.message,
      };
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
      state.logOutMessage = "";
    },
    logOut: (state, action) => {
      state.username = "";
      state.email = "";
      state.role = "";
      state.approved = "";
      state.secretcode = "";
      state.block = "";
    },

    //Sign Out
    resetState: (state) => {
      localStorage.removeItem("persistroot");
      const initialState = getInitialAuthState();
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});
export const {
  setLoginResponse,
  logOut,
  setMessage,
  clearMessage,
  resetState,
} = authSlice.actions;
export default authSlice.reducer;
