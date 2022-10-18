import {
  ADD_PRODUCT,
  GET_PRODUCT,
  EDIT_PRODUCT,
  EDIT_PRICE_PROVEEDOR,
  ERROR_PRODUCT,
  REQUEST_PRODUCT,
} from "../../types";
export const state = {
  products: [],
  loading: false,
  errorMessage: null,
};

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload.producto, ...state.products],
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload.producto._id ? action.payload.producto : p
        ),
        loading: false,
      };
    case EDIT_PRICE_PROVEEDOR:
      const result = action.payload.results.map((p) => ({
        ...p,
        codigoProvedor: action.payload.proveedor,
      }));
      return {
        ...state,
        products: removeDuplicates(
          result.concat(state.products)
        ),
        loading: false,
      };
    case ERROR_PRODUCT:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const removeDuplicates = (inArray) => {
  var arr = inArray.concat(); // create a clone from inArray so not to change input array
  //create the first cycle of the loop starting from element 0 or n
  for (var i = 0; i < arr.length; ++i) {
    //create the second cycle of the loop from element n+1
    for (var j = i + 1; j < arr.length; ++j) {
      //if the two elements are equal , then they are duplicate
      if (arr[i]._id === arr[j]._id) {
        arr.splice(j, 1); //remove the duplicated element
      }
    }
  }
  return arr;
};
