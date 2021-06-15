import React from "react";
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
import { Redirect } from "react-router-dom";
import { deleteFromFavouritesURL } from "../constants";
import { Link } from "react-router-dom";

class FavouritesLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: [],
      ...props,
    };
    console.log("Favourites", { state: this.state });
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/api/favourites/", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res2) => res2.json())
      .then((res2) => {
        console.log(res2.results);
        this.setState({ data: res2.results[0].recipes, loading: false });
      });
  }

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
        this.setState({ loading: true });
        console.log({slug});
            fetch("http://127.0.0.1:8000/api/favourites/", {
              headers: { "Content-Type": "application/json" },
            })
              .then((res2) => res2.json())
              .then((res2) => {
                console.log(res2.results);
                this.setState({ data: res2.results[0].recipes, loading: false });
              });
    });

    // this.setState({
    //   data: this.state.data.filter((recipe) => recipe.slug !== slug),
    // });
  };

  render() {
    const { data, error, loading, isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (!!error) {
      return (
        <Message
          error
          header="There was some errors with your submission"
          content={JSON.stringify(error)}
        />
      );
    }
    if (loading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src="/images/recipes/spageto.jpg" />
        </Segment>
      );
    }

    return (
      <Container>
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
                  <Item.Extra>
                    <Button
                      primary
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() => this.handleDeleteFromFavourites(item.slug)}
                    >
                      Delete from favourites!
                      <Icon name="heart" />
                    </Button>
                    <Label>{item.slug}</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }
}

export default FavouritesLayout;
