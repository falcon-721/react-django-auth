import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./HomeContainer";
import rootReducer from "./reducers";
import Navbar from "./containers/NavbarContainer";
import DogList from "./containers/DogListContainer";
import { PrivateRoute } from "./customRoutes/ProtectedRoutes";

//import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

if (localStorage.getItem("goog_access_token_conv")) {
  store.dispatch({ type: "GOOG_AUTHENTICATE_ACTION" });
}

if (localStorage.getItem("github_access_token_conv")) {
  store.dispatch({ type: "GITHUB_AUTHENTICATE_ACTION" });
}

ReactDOM.render(
  //<MuiThemeProvider>
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/secret" component={DogList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  //</MuiThemeProvider>,
  document.getElementById("root")
);
