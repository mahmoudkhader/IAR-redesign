// Import provider from redux, which provides the app with a store (or state) and as such must wrap around app
// import { createStore, applyMiddleware, compose } from "redux";
import { createStore, applyMiddleware } from "redux";
// Import thunk
import thunk from "redux-thunk";
// import root reducer ( we called it index.js, so we don't need to specify, but will anyway)
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

// Give it an empty initialState as a placeholder sot aht it looks neater in the store object
const initialState = {};
// Create middleWare variable
const middleware = [thunk];
// Create the store, and pass in an empty functino as the reducer, preloaded state, and enhancer for now
// createStore(reducer, [preloadedState], [enhancer])
// Use the spread operator and put the middleware into the enhancer (applyMiddleware)
const store = createStore(
  rootReducer,
  initialState,
  //   place applyMiddleware into compose, then implement redux dev tools in order to use the redux extension
  // compose(
  //   applyMiddleware(...middleware),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
