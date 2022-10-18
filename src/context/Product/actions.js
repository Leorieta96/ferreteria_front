import {
  ADD_PRODUCT,
  GET_PRODUCT,
  EDIT_PRODUCT,
  EDIT_PRICE_PROVEEDOR,
  ERROR_PRODUCT,
  REQUEST_PRODUCT,
} from "../../types";

const ROOT_URL = "https://ferreteria-stock.herokuapp.com/api";

export const addProduct = async (dispatch, payload) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(localStorage.getItem("currentUser")).token,
    },
    body: JSON.stringify(payload),
  };
  try {
    dispatch({ type: REQUEST_PRODUCT });
    let response = await fetch(`${ROOT_URL}/productos`, requestOptions);
    let data = await response.json();
    if (data) {
      data = {
        producto: {
          ...data.producto,
          codigoProvedor: data.proveedor
        }
      }
      dispatch({ type: ADD_PRODUCT, payload: data });
    }
    dispatch({ type: ERROR_PRODUCT, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PRODUCT, error: error });
  }
};

export const getProducts = async (dispatch, payload = undefined) => {
  dispatch({ type: REQUEST_PRODUCT });
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(localStorage.getItem("currentUser")).token,
    },
    body: payload,
  };
  try {
    let response = await fetch(`${ROOT_URL}/productos`, requestOptions);
    let data = await response.json();
    if (data) {
      dispatch({ type: GET_PRODUCT, payload: data });
    }
    dispatch({ type: ERROR_PRODUCT, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PRODUCT, error: error });
  }
};

export const editProduct = async (dispatch, payload) => {
  dispatch({ type: REQUEST_PRODUCT });
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
      data = {
        producto: {
          ...data.producto,
          codigoProvedor: data.proveedor
        }
      }
      dispatch({ type: EDIT_PRODUCT, payload: data });
    }
    dispatch({ type: ERROR_PRODUCT, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PRODUCT, error: error });
  }
};

export const editPriceProducts = async (dispatch, payload) => {
  dispatch({ type: REQUEST_PRODUCT });
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
      `${ROOT_URL}/productos/`,
      requestOptions
    );
    let data = await response.json();
    if (data) {
      dispatch({ type: EDIT_PRICE_PROVEEDOR, payload: data });
    }
    dispatch({ type: ERROR_PRODUCT, error: data.errors[0] });
  } catch (error) {
    dispatch({ type: ERROR_PRODUCT, error: error });
  }
};