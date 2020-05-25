import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import notificationReducers from "./components/notifications/reducers";
import purchaseReducers from "./pages/purchases/reducers";

const reducers = combineReducers({
  notifications: notificationReducers,
  purchases: purchaseReducers
});

const middleware = applyMiddleware(promise(), thunk);

const store = createStore(reducers, compose(middleware));

export default store;
