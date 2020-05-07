import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import DefaultLayout from "../layouts/Default";
import AuthLayout from "../layouts/Auth";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import PurchaseList from "../pages/purchase/PurchaseList";
import Purchase from "../pages/purchase/Purchase";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cashback from "../pages/cashback/Cashback";
import About from "../pages/About";
import Page404 from "../pages/misc/Page404";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Landing {...props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/home"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Home {...props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/compras"
          exact={true}
          render={props => (
            <DefaultLayout>
              <PurchaseList {...props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/compra/:id"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Purchase {...props} />
            </DefaultLayout>
          )}
        />
        <Route
          path="/entrar"
          exact={true}
          render={props => (
            <AuthLayout>
              <Login {...props} />
            </AuthLayout>
          )}
        />
        <Route
          path="/registrar"
          exact={true}
          render={props => (
            <AuthLayout>
              <Register {...props} />
            </AuthLayout>
          )}
        />
        <PrivateRoute
          path="/cashback"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Cashback {...props} />
            </DefaultLayout>
          )}
        />
        <Route
          path="/sobre"
          exact={true}
          render={props => <About {...props} />}
        />
        <Route render={() => <Page404 />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
