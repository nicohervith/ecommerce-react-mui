export const initialState = {
  basket: [],
  user: null,
  shippingData: {},
  paymentMessage: "",
  isAuthenticated: false,
};

export const actionTypes = {
  ADD_TO_BASKET: "ADD_TO_BASKET",
  REMOVE_ITEM: "REMOVE_ITEM",
  EMPTY_BASKET: "EMPTY_BASKET",
  SET_USER: "SET_USER",
  SET_SHIPPINGDATA: "SET_SHIPPINGDATA",
  SET_PAYMENT_MESSAGE: "SET_PAYMENT_MESSAGE",
};

export const getBasketTotal = (basket) =>
  basket?.reduce((quantity, item) => Number(item.price) + Number(quantity), 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_ITEM":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log("Cant remove product ");
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: action.basket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        isAuthenticated: !!action.user,
      };

    case "SET_SHIPPINGDATA":
      return {
        ...state,
        shippingData: action.shippingData,
      };

    case "SET_PAYMENT_MESSAGE":
      return {
        ...state,
        paymentMessage: action.paymentMessage,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default reducer;
