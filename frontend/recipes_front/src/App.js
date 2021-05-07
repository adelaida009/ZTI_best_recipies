import React, { Component } from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Form from "./components/Form";
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';

class App extends Component {
  getRecipe = (e) => {
    const recipeName = e.target.elements.recipeName.value;
    const [token, setToken] = useState();
    e.preventDefault();
    console.log(recipeName);

    if(!token) {
    return <Login setToken={setToken} />
  }
  }

  render() {
    return (
        <div className="wrapper">
          <h1>Application</h1>
          <BrowserRouter>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/preferences">
                <Preferences />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;