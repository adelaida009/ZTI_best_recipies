import React from "react"
import axios from "axios";
import { Button, Container, Dimmer, Icon, Image, Item, Label, Loader, Message, Segment} from "semantic-ui-react"
import {recipeListURL, addToFavouritesURL} from "../constants"

class RecipeList extends React.Component{
  state = {
    loading: false,
    error: null,
    data: []
  };

  componentDidMount() {
    this.setState({loading: true});
    fetch('http://127.0.0.1:8000/api/recipe-list/', {
      headers: {'Content-Type': 'application/json'},
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        this.setState({data: res.results, loading: false});
      })
  };
  /*
    axios
      .get(recipeListURL)
      .then(res => {
        console.log(res.data);
        this.setState({data: res.data, loading: false});
      })*/
      /*.catch(err => {
       this.setState({error: err, loading: false});*/

  handleAddtoFavourites = slug => {
    this.setState({loading: true});
    fetch(addToFavouritesURL, {
      headers: {'Content-Type': 'application/json'},
    }, {slug})
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        // update favourites count?
        this.setState({loading: false});
      })
  };

  render(){
    const {data, error, loading} = this.state;
    return(
      <Container>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content = {JSON.stringify(error)}
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
          {data.map(item => {
            return <Item key = {item.id}>
              <Item.Image src={item.image} />
              <Item.Content>
                <Item.Header as="a">{item.title}</Item.Header>
                <Item.Description>{item.description}</Item.Description>
                <Item.Extra>
                  <Button primary floated="right" icon labelPosition="right" onClick={() => this.handleAddtoFavourites(item.slug)}>
                    Add to favourites!
                    <Icon name="heart" />
                  </Button>
                  <Label>{item.ingredients}</Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          })}
        </Item.Group>
      </Container>
    );
  }
}
export default RecipeList;