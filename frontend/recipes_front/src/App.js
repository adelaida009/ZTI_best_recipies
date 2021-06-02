import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import { logout } from "./store/actions/auth";
//import React from 'react';
import "./App.css";
import {
  Sidebar,
  InputItem,
  DropdownItem,
  Icon,
  Item,
  Logo,
  LogoText,
} from "react-sidebar-ui";
import "react-sidebar-ui/dist/index.css";
import { Button } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Welcome to Best Recipes!</h1>
          <Sidebar bgColor="black" isCollapsed={false}>
            <Logo
              image="https://media.giphy.com/media/oS2lkrdaq3a3m/giphy.gif"
              imageName="spagetto"
            />
            <LogoText>ZTI Best Recipes</LogoText>
            <DropdownItem
              values={["First", "Second", "Third"]}
              bgColor={"black"}
            >
              Menu:
            </DropdownItem>
            <Item bgColor="black">
              <Icon>
                <i className="fas fa-home" />
              </Icon>
              <Link to="/">
                <Button variant="dark">
                  <p>Home</p>
                </Button>
              </Link>
            </Item>
            <Item bgColor="black">
              <Icon>
                <i className="fas fa-recipes" />
              </Icon>
              <Link to="/recipes">
                <Button variant="dark">
                  <p>Recipes</p>
                </Button>
              </Link>
            </Item>
            {/*              <Item bgColor='black'>
                <Icon><i className="fas fa-rss-square"/></Icon>
                <Link to="/about">
                  <Button variant="dark">
                    <p>About</p>
                  </Button>
                </Link>
              </Item>*/}
            <InputItem type="text" placeholder={"Search..."} />
          </Sidebar>
        </div>
        <CustomLayout {...this.props}>
          <BaseRouter {...this.props} />
        </CustomLayout>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
