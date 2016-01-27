import React from 'react';
import _ from 'lodash';

import Card from 'material-ui/lib/card/card';
//import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
//import CardTitle from 'material-ui/lib/card/card-title';
//import FlatButton from 'material-ui/lib/flat-button';

import TextField from 'material-ui/lib/text-field'
//import Badge from 'material-ui/lib/badge'

//Import statement:
//import List from 'material-ui/lib/lists/list'
//import ListDivider from 'material-ui/lib/lists/list-divider'
//import ListItem from 'material-ui/lib/lists/list-item'

//import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

//const SelectableList = SelectableContainerEnhance(List);

import TagList from '../tags/TagList'
import DivEdit from './DivEdit'
import DocData from '../types/DocData'
import DocStore from '../stores/DocStore'
import TagStore from '../stores/TagStore'
import '../util/Utils.js'


export default class Editor extends React.Component {

  constructor(props) {

    super(props);

    this.state = Object.assign(new DocData())
  }

  componentWillMount() {

    var that = this;

    this.unsub = [];

    this.unsub.push(
      DocStore.docObservable(this.props.uuid)
        ._onValue(doc => that.setState(_.pick(doc, 'uuid', 'title', 'subtitle', 'content')))
    );

    this.unsub.push(
      DocStore.docTagsObservable(this.props.uuid)
        ._onValue(tags => that.setState({tags}))
    )
  }

  render() {

    const that = this;
    const uuid = this.props.uuid
    const previewMode = this.props.previewMode

    return (
      <Card style={{overflow:'visible'}}>

        <CardText>
          <TextField
            hintText="Title"
            multiLine={true}
            value={that.state.title}
            fullWidth={true}
            onChange={previewMode ? _.noop : evt => DocStore.updateDoc({uuid, title: evt.target.value})}
            />
          <TextField
            hintText="Subtitle"
            multiLine={true}
            value={that.state.subtitle}
            fullWidth={true}
            onChange={previewMode ? _.noop : evt => DocStore.updateDoc({uuid, subtitle: evt.target.value})}
            />
        </CardText>

        <CardText>
          <DivEdit
            key="Content"
            style={{minHeight: '3em'}}
            html={this.state.content}
            onChange={previewMode ? _.noop : evt => DocStore.updateDoc({uuid, content: evt.target.value})}>
          </DivEdit>
        </CardText>

        <CardText style={{overflow:'visible'}}>
          <TagList
            autocompleteTag={TagStore.lookupTags}
            createTag={tag => TagStore.createTag(tag)}
            addTag={tag => DocStore.addTagToDoc(uuid, tag)}
            tags={that.state.tags}
            previewMode={previewMode}/>
        </CardText>

      </Card>
    );
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub());
  }
}


Editor.defaultProps = {

  /**
   * doc uuid
   */
  uuid: '',
  /**
   * Preview mode
   */
  previewMode: false
}
