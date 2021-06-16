import React from "react";
import {
  Container,
  Item,
  Message,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";

import { connect } from "react-redux";
import { fetchShoppingList } from "../store/actions/shoppingList";
import { Redirect } from "react-router";
import { sendShoppingList } from "../constants";
import SendEmailModal from "./SendEmailModal";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      ...props,
    };
    this.props.reloadShoppingList();
    console.log(this.state);
  }

  handleSendEmail = (values) => {
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    this.setState({ loading: true });
    fetch(sendShoppingList, {
      method: "POST",
      headers: whatever,
      body: JSON.stringify({ "e-mail": values.email }),
    }).then((res) => {
      this.props.reloadShoppingList();
    });
  };

  render() {
    const { data, error, isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        <SendEmailModal callback={this.handleSendEmail} />
        <Item.Group divided>
          {data.map((entry) => {
            return entry.ingridients.map((item) => {
              return (
                <Item key={item.id}>
                  <Item.Content>
                    <Item.Header>
                      {item.name}: {item.quantity}
                    </Item.Header>
                    <Item.Description>{item.recipe}</Item.Description>
                    <Item.Extra>
                      <Label>{item.slug}</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            });
          })}
        </Item.Group>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.shoppingList.shoppingList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadShoppingList: () => dispatch(fetchShoppingList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
