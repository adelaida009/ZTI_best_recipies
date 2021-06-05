import React, { useState } from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import RecipeList from "./containers/RecipeList";
import FavouritesLayout from "./containers/Favourites";
import ReceipeDetails from "./containers/ReceipeDetails";
import ShoppingList from "./containers/ShoppingList";

const BaseRouter = (props) => {
  const { isAuthenticated } = props;

  return (
    <Hoc>
      <Route
        exact
        path="/recipes"
        render={(props) => {
          const extendedProps = Object.assign({}, props, { isAuthenticated });
          return <RecipeList {...extendedProps} />;
        }}
      />

      <Route
        exact
        path="/shopping-list"
        render={(props) => {
          const extendedProps = Object.assign({}, props, { isAuthenticated });
          return <ShoppingList {...extendedProps} />;
        }}
      />
      <Route
        exact
        path="/receipes/:id"
        render={(props) => {
          const extendedProps = Object.assign({}, props, { isAuthenticated });
          return <ReceipeDetails {...extendedProps} />;
        }}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route
        exact
        path="/"
        render={(props) => {
          const extendedProps = Object.assign({}, props, { isAuthenticated });
          return <HomepageLayout {...extendedProps} />;
        }}
      />
      <Route
        path="/favourites"
        render={(props) => {
          const extendedProps = Object.assign({}, props, { isAuthenticated });
          return <FavouritesLayout {...extendedProps} />;
        }}
      />
    </Hoc>
  );
};

export default BaseRouter;
