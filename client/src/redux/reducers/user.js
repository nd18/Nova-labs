const initialState = {
  userDetail: {
    username: null
  }
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN_USER":
      return {
        ...state,
        userDetail: {...action.payload},
      };
    case "UNSET_LOGGED_IN_USER":
      return {
        ...state,
        userDetail: initialState.userDetail,
      };
    default:
      return state;
  }
}
