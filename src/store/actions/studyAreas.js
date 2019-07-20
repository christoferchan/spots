import firebase from "../../firebase/firebase";

export const addStudyArea = location => ({
  type: "ADD_STUDY_AREA",
  location
});

export const startAddStudyArea = location => {
  return dispatch => {
    firebase
      .firestore()
      .collection("spots")
      .add({ ...location })
      .then(ref => dispatch(addStudyArea({ ...location, id: ref.id })))
      .catch(err => console.log(err));
  };
};

export const getSpots = locations => ({
  type: "GET_SPOTS",
  locations
});

export const startGetSpots = locations => {
  return dispatch => {
    const allLocations = [];

    locations.forEach(spot =>
      allLocations.push({ ...spot.data(), id: spot.id })
    );
    dispatch(getSpots(allLocations));
  };
};

export const removeSpot = location => ({
  type: "REMOVE_SPOT",
  location
});

export const startRemoveSpot = location => {
  return dispatch => {
    firebase
      .firestore()
      .collection("spots")
      .doc(location.id.toString())
      .delete();

    dispatch(removeSpot(location));
  };
};
