import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import settingsReducer from "../reducers/settings";
import contentTypesReducer from "../reducers/contentTypes";
import fieldsReducer from "../reducers/fields";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      settings: settingsReducer,
      contentTypes: contentTypesReducer,
      fields: fieldsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
