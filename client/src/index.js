import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reducers from "./Reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import materializeCSS from "materialize-css/dist/css/materialize.min.css";

const store = createStore(reducers, applyMiddleware(reduxThunk));
//console.log(store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//"STRIPE KEY IS : ", process.env.REACT_APP_STRIPE_KEY);
//console.log("ENvironment is : ", process.env.NODE_ENV);
