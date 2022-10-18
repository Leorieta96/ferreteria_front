import {
  ADD_PROVEEDOR,
  GET_PROVEEDORES,
  EDIT_PROVEEDOR,
  ERROR_PROVEEDOR,
  REQUEST_PROVEEDOR,
} from "../../types";
export const state = {
  proveedores: [],
  loading: false,
  errorMessage: null,
};

export const ProveedorReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_PROVEEDOR:
      return {
        ...state,
        loading: true,
      };
    case ADD_PROVEEDOR:
      return {
        ...state,
        proveedores: [action.payload.proveedor, ...state.proveedores],
        loading: false,
      };
    case GET_PROVEEDORES:
      return {
        ...state,
        proveedores: action.payload.proveedors,
        loading: false,
      };
    case EDIT_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.map((p) =>
          p._id === action.payload.proveedor._id ? action.payload.proveedor : p
        ),
        loading: false,
      };
    case ERROR_PROVEEDOR:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
