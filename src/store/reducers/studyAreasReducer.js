const defaultState = [];

const studyAreasReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_STUDY_AREA":
      return [...state, action.location];
    case "GET_SPOTS":
      return action.locations;
    case "REMOVE_SPOT":
      return state.filter(location => {
        return location !== action.location;
      });
    default:
      return state;
  }
};

export default studyAreasReducer;
