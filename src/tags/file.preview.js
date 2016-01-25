import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';

//Import statement:
import List from 'material-ui/lib/lists/list'
//import ListDivider from 'material-ui/lib/lists/list-divider'
//import ListItem from 'material-ui/lib/lists/list-item'

import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

//const SelectableList = SelectableContainerEnhance(List);

import TagList from './TagList'


export default class FileePreview extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      name: 'file',
      path: '/path',
      tags: [
        {uuid: '1', name: 'tag1', path: []},
        {uuid: '2', name: 'tag2', path: []}
      ],
      preview: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {

  }

  onTagClick(evt, index) {

  }

  onFileClick(evt, index) {

  }

  render() {

    return (
      <Card>
        <CardTitle title={this.state.name} subtitle={this.state.path}/>
        <CardText>
          <TagList tags={this.state.tags} editable='false'/>
        </CardText>

        <CardText>
          {this.state.preview}

        </CardText>

        <CardActions>
          <FlatButton label="Edit"/>
        </CardActions>

      </Card>
    );
  }
}
