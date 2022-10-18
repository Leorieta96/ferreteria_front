
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).usuario
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";
 
export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.usuario,
        token: action.payload.token,
        loading: false,
        errorMessage: null
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: ""
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};