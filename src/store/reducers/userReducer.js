const defaultUserState = { location: { longitude: "", latitude: "" } };

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case "GET_LOCATION":
      return { ...state, location: action.coords };
    default:
      return state;
  }
};

export default userReducer;
