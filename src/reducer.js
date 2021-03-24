export const initialState = {
    close: false,
  };
  
  
  const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
      case "SET_CLOSE":
        return {
          ...state,
          close: action.close,
        }
  
      default:
        return state;
    }
  };
  
  export default reducer;