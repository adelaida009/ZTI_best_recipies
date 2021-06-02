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
    fetch("http://127.0.0.1:8000/api/favourites-list/", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res2) => res2.json())
      .then((res2) => {
        console.log(res2.results);
        this.setState({ data: res2.results, loading: false });
      });
  }

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
                  <Item.Header as="a">{item.title}</Item.Header>
                  <Item.Description>{item.description}</Item.Description>
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
