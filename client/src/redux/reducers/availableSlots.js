const initialState = {
  list: []
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AVAILABLE_SLOT_LIST":
      return {
        ...state,
        list: action.payload.data,
      };
    default:
      return state;
  }
}
