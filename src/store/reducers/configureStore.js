import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import studyAreasReducer from "./studyAreasReducer";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  studyAreas: studyAreasReducer,
  search: searchReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
