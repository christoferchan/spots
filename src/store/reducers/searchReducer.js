const defaultState = [];

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_SEARCH_RESULTS":
      return action.businesses.businesses;
    default:
      return state;
  }
};

export default searchReducer;
