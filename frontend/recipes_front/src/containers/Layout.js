import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class CustomLayout extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <Menu inverted>
          <Container style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Link to="/">
                <Menu.Item header>Home</Menu.Item>
              </Link>
              <Link to="/recipes">
                <Menu.Item header>Recipes</Menu.Item>
              </Link>
              {isAuthenticated ? (
                <React.Fragment>
                  <Link to="/favourites">
                    <Menu.Item header>Favourites</Menu.Item>
                  </Link>
                  <Link to="/shopping-list">
                    <Menu.Item header>Shopping list</Menu.Item>
                  </Link>
                  <Link to="/add-recipe">
                    <Menu.Item header>Add new recipe</Menu.Item>
                  </Link>
                </React.Fragment>
              ) : (
                <div />
              )}
            </div>
            <div style={{ display: "flex" }}>
              {isAuthenticated ? (
                <Menu.Item header onClick={() => this.props.logout()}>
                  Logout
                </Menu.Item>
              ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item header>Login</Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header>Signup</Menu.Item>
                  </Link>
                </React.Fragment>
              )}
            </div>
          </Container>
        </Menu>
        <div className="content-container">{this.props.children}</div>
      </div>
    );
  }
}

export default CustomLayout;
