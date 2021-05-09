import React from 'react'
import axios from 'axios';
import { Button, Container,Dimmer, Icon, Image, Item, Label, Loader, Message, Segment} from 'semantic-ui-react'

import {recipeListURL} from '../constants'

const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

class RecipeList extends React.Component{

    state = {
        loading: false,
        error: null,
        data: []
    };

    componentDidMount(){
        this.setState({loading: true});
        axios
          .get(recipeListURL)
          .then(res => {
            this.setState({data: res.data, loading: false});
          })
          .catch(err => {
            this.setState({error: err, loading: false});
          })
    }

    render(){
      const {data, error, loading} = this.state;
      return(
        <Container>
          {error && (
            <Message
              error
              header='There was some errors with your submission'
              content = {JSON.stringify(error)}
            />
          )}
          {loading && (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>

              <Image src='/images/recipes/spageto.jpg' />
            </Segment>
          )}
              <Item.Group divided>
                <Item>
                  <Item.Image src='/images/recipes/spageto.jpg' />

                  <Item.Content>
                    <Item.Header as='a'>Spaghetti Bolognese</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Nie wiem co tu napisac</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right' icon labelPosition='right'>
                        Add to favourites!
                        <Icon name='heart' />
                      </Button>
                      <Label>Vegan</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
          </Container>
        );
    }
}
export default RecipeList;