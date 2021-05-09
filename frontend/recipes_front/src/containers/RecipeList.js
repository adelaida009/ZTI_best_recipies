import React from 'react'
import axios from 'axios';
import { Button, Container, Icon, Image, Item, Label } from 'semantic-ui-react'

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
        .get('./some-url')
        .then(res => {
            this.setState({data: res.data, loading: false});
        })
        .catch(err => {
            this.setState({error: err, loading: false});
        })
    }

    render(){
        return(
            <Container>
              <Item.Group divided>
                <Item>
                  <Item.Image src='/images/wireframe/image.png' />

                  <Item.Content>
                    <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>IFC Cinema</span>
                    </Item.Meta>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Button primary floated='right' icon labelPosition='right'>
                        Add to favourites!
                        <Icon name='heart' />
                      </Button>
                      <Label>Limited</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
          </Container>
        );
    }
}
export default RecipeList;