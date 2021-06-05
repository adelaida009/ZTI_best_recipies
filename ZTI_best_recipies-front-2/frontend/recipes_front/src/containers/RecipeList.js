import React from "react";
import axios from "axios";
import {
  Button,
  Container,
  Dimmer,
  Icon,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { recipeListURL, addToFavouritesURL, endpoint } from "../constants";
import { Link } from "react-router-dom";
//import {authAxios} from "../utils";
//import {authFetch} from "../utils";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: [],
      ...props,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
     fetch("http://127.0.0.1:8000/api/recipe-list/", {
       headers: { "Content-Type": "application/json" },
     })
       .then((res2) => res2.json())
       .then((res2) => {
         console.log(res2.results);
         this.setState({ data: res2.results, loading: false });
       });
  }

  handleAddtoFavourites = (slug) => {
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
    };
    this.setState({ loading: true });
    console.log(slug);
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

  render() {
    const { data, error, loading, isAuthenticated } = this.state;
    return (
      <Container>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {/*        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src= "/images/recipes/spageto.jpg" />
          </Segment>
        )}*/}
        <Item.Group divided>
          {data.map((item) => {
            return (
              <Item key={item.id}>
                <Item.Image src={item.image} />
                <Item.Content>
                  <Item.Header>
                    <Link
                      to={{
                        pathname: `/receipes/${item.id}`,
                        state: { recipe: item },
                      }}
                    >
                      {item.title}
                    </Link>
                  </Item.Header>
                  <Item.Description>{item.description}</Item.Description>
                  {/* {isAuthenticated ? (
                    <Item.Extra>
                      <Button
                        primary
                        floated="right"
                        icon
                        labelPosition="right"
                        onClick={() => this.handleAddtoFavourites(item.slug)}
                      >
                        Add to favourites!
                        <Icon name="heart" />
                      </Button>
                      <Label>{item.slug}</Label>
                    </Item.Extra>
                  ) : (
                    <div />
                  )} */}
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }
}
export default RecipeList;
