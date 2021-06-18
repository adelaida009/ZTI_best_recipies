import React from "react";
import { Row, Col } from "antd";
import { Button, Icon } from "semantic-ui-react";
import {
  addToFavouritesURL,
  addToShoppingListURL,
  deleteFromFavouritesURL,
  deleteFromShoppingListURL,
} from "../constants";

import { connect } from "react-redux";
import { fetchFavourites } from "../store/actions/favourites";
import { fetchShoppingList } from "../store/actions/shoppingList";

class ReceipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: props.location.state.recipe,
      ...props,
    };
    this.props.reloadFavourites();
    this.props.reloadShoppingList();
  }

  handleAddtoFavourites = (slug) => {
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    this.setState({ loading: true });
    fetch(addToFavouritesURL, {
      method: "POST",
      headers: whatever,
      body: JSON.stringify({ slug: slug }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        //this.setState({data: res.results, loading: false});
      });
  };

  handleDeleteFromFavourites = (slug) => {
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    this.setState({ loading: true });
    fetch(deleteFromFavouritesURL, {
      method: "POST",
      headers: whatever,
      body: JSON.stringify({ slug: slug }),
    }).then((res) => {
      this.props.reloadFavourites();
    });
  };

  handleAddtoShoppingList = (slug) => {
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    this.setState({ loading: true });
    fetch(addToShoppingListURL, {
      method: "POST",
      headers: whatever,
      body: JSON.stringify({ slug: slug }),
    }).then((res) => {
      this.props.reloadShoppingList();
    });
  };

  handleDeleteFromShoppingList = (slug) => {
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    this.setState({ loading: true });
    fetch(deleteFromShoppingListURL, {
      method: "POST",
      headers: whatever,
      body: JSON.stringify({ slug: slug }),
    }).then((res) => {
      this.props.reloadShoppingList();
    });
  };

  isInFavourites = () => {
    const find = this.state.favourites.find(
      (fav) => fav.id === this.state.data.id
    );
    return !!find;
  };

  isInShoppingList = () => {
    if (!this.state.shoppingList || !this.state.shoppingList["slugs"]) {
      return false;
    }
    const find = this.state.shoppingList["slugs"].find((shopping) => {
      return shopping === this.state.data.slug;
    });
    return !!find;
  };

  renderFavouritesButton = () => {
    if (this.isInFavourites()) {
      return (
        <Button
          primary
          icon
          onClick={() => this.handleDeleteFromFavourites(this.state.data.slug)}
        >
          Delete from favourites!
          <Icon name="heart" />
        </Button>
      );
    }
    return (
      <Button
        primary
        icon
        onClick={() => this.handleAddtoFavourites(this.state.data.slug)}
      >
        Add to favourites!
        <Icon name="heart" />
      </Button>
    );
  };

  renderShoppingListButtons = () => {
    if (this.isInShoppingList()) {
      return (
        <Button
          primary
          icon
          onClick={() =>
            this.handleDeleteFromShoppingList(this.state.data.slug)
          }
        >
          Delete from shopping list
          <Icon name="cart" />
        </Button>
      );
    }
    return (
      <Button
        primary
        icon
        onClick={() => this.handleAddtoShoppingList(this.state.data.slug)}
      >
        Add to shopping list
        <Icon name="cart" />
      </Button>
    );
  };
  render() {
    if (!this.state.data) {
      return <div>Loading...</div>;
    }
    const ingredientsObject = JSON.parse(this.state.data.ingredients);
    const ingredients = Object.keys(ingredientsObject).map((key) => {
      const value = ingredientsObject[key];
      return {
        name: key,
        value,
      };
    });

    return (
      <Row style={{ width: "100%", height: "100%" }}>
        <Col span={24}>
          <Row className="receipe-details__header">
            <Col span={12}>
              <div className="receipe-details__header--title">
                <h1>{this.state.data.title}</h1>
              </div>
            </Col>
            <Col span={12}>
              <div className="receipe-details__header--buttons">
                {this.renderFavouritesButton()}
                {this.renderShoppingListButtons()}
              </div>
            </Col>
          </Row>
          <Row className="receipe-details__content">
            <Col span={12}>
              <h2>Ingredients</h2>
              <div className="receipe-details__content--ingredients">
                <ul>
                  {ingredients.map((ingredient, index) => {
                    return (
                      <li
                        key={`${ingredient.name}-${ingredient.value}-${index}`}
                      >
                        <p>
                          <b>{ingredient.name}</b>: {ingredient.value}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <h2>Description</h2>
              <p>{this.state.data.description}</p>
            </Col>
            <Col span={12}>
              <div className="receipe-details__content--image">
                <img
                  src={`${this.state.data.photo}`}
                  alt={`${this.state.data.photo}-alt`}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites.favourites,
    shoppingList: state.shoppingList.shoppingList,
  };

  // return {
  //   favourites: [
  //     {
  //       id: 1,
  //       title: "#1 recipe",
  //       photo: "https://media.giphy.com/media/oS2lkrdaq3a3m/giphy.gif",
  //       description: "Example recipe #1",
  //       ingredients: '{"makaron": 1, "pomidor": 2}',
  //       created: "2021-04-03T13:12:42.377000Z",
  //       created_by: 1,
  //       slug: "recipe-1",
  //       tags: "obiad, makaron",
  //     },
  //   ],
  //   shoppingList: [
  //     {
  //       id: 1,
  //       ingredients: [
  //         {
  //           id: 12,
  //           quantity: 1,
  //           name: "pomidory",
  //           recipe: "#1 recipe",
  //         },
  //         {
  //           id: 13,
  //           quantity: 2,
  //           name: "oliwki",
  //           recipe: "#1 recipe",
  //         },
  //       ],
  //     },
  //   ],
  // };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadFavourites: () => dispatch(fetchFavourites()),
    reloadShoppingList: () => dispatch(fetchShoppingList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceipeDetails);
