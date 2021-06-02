import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

class HomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentWillReceiveProps(props) {
    this.setState({ ...props });
  }
  render() {
    const { isAuthenticated } = this.state;
    return (
      <Menu inverted>
        <Container>
          {isAuthenticated ? (
            <React.Fragment>
              <ResponsiveContainer>
                <Segment style={{ padding: "2em 0em" }} vertical>
                  <Container text>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      Go to all recipes!
                    </Header>
                    <Link to="/recipes" className="btn btn-primary">
                      Recipes
                    </Link>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      Go to your favourites!
                    </Header>
                    <Link to="/favourites" className="btn btn-primary">
                      Favourites
                    </Link>
                  </Container>
                </Segment>
              </ResponsiveContainer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ResponsiveContainer>
                <Segment style={{ padding: "2em 0em" }} vertical>
                  <Container text>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      Don't have an account yet?
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>Click the below link!</p>
                    <Link to="/signup" className="btn btn-primary">
                      Sign up
                    </Link>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      Already signed up?
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>Login!</p>
                    <Link to="/login" className="btn btn-primary">
                      Login
                    </Link>
                  </Container>
                </Segment>
              </ResponsiveContainer>
            </React.Fragment>
          )}
        </Container>
      </Menu>
    );
  }
}

export default HomepageLayout;
