import {
  ADD_PROVEEDOR,
  GET_PROVEEDORES,
  EDIT_PROVEEDOR,
  ERROR_PROVEEDOR,
  REQUEST_PROVEEDOR,
} from "../../types";

const ROOT_URL = "https://ferreteria-stock.herokuapp.com/api";

export const addProveedor = async (dispatch, payload) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(localStorage.getItem("currentUser")).token,
    },
    body: JSON.stringify(payload),
  };
  try {
    dispatch({ type: REQUEST_PROVEEDOR });
    let response = await fetch(`${ROOT_URL}/proveedor`, requestOptions);
    let data = await response.json();
    if (data) {
      dispatch({ type: ADD_PROVEEDOR, payload: data });
    }
    dispatch({ type: ERROR_PROVEEDOR, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PROVEEDOR, error: error });
  }
};

export const getProveedores = async (dispatch, payload = undefined) => {
  dispatch({ type: REQUEST_PROVEEDOR });
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(localStorage.getItem("currentUser")).token,
    },
    body: payload,
  };
  try {
    let response = await fetch(`${ROOT_URL}/proveedor`, requestOptions);
    let data = await response.json();
    if (data) {
      dispatch({ type: GET_PROVEEDORES, payload: data });
    }
    dispatch({ type: ERROR_PROVEEDOR, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PROVEEDOR, error: error });
  }
};

export const editProveedor= async (dispatch, payload) => {
  dispatch({ type: REQUEST_PROVEEDOR });
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(localStorage.getItem("currentUser")).token,
    },
    body: JSON.stringify(payload),
  };
  try {
    let response = await fetch(
      `${ROOT_URL}/productos/${payload._id}`,
      requestOptions
    );
    let data = await response.json();
    if (data) {
      dispatch({ type: EDIT_PROVEEDOR, payload: data });
    }
    dispatch({ type: ERROR_PROVEEDOR, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PROVEEDOR, error: error });
  }
};
