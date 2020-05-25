import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import NotificationsContainer from "./components/notifications/Notifications-Container";
import PurchasesContainer from "./pages/purchases/Purchases-Container";
import store from "./store";
import "./styles/main";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="fluid-container">
          <Route path="/" component={NotificationsContainer} />
          <Route path="/flagged-purchases" component={PurchasesContainer} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
