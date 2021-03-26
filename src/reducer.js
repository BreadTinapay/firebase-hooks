export const initialState = {
    user: null,
    admin: null,
  };
  
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.user,
        }

        case "CHECK_ADMIN":
          return {
            ...state,
            admin: action.admin,
          }
  
      default:
        return state;
    }
  };
  
  export default reducer;