import React from 'react'
import _ from 'lodash'
import Remarkable from 'remarkable'

import Card from 'material-ui/lib/card/card';
//import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
//import FlatButton from 'material-ui/lib/flat-button';

import TagList from '../views/tags/TagList'

import DocData from '../docs/DocData'
import AppState from '../appstate/AppState'


export default class Preview extends React.Component {

  constructor(props) {

    super(props);

    this.state = new DocData()

    this.md = new Remarkable();
  }

  componentWillMount() {

    this.unsub = [];

    this.unsub.push(
      AppState.docObservable(this.props.uuid)
        .map(doc => doc.title)
        ._onValue(title => this.setState({title}))
    );

    this.unsub.push(
      AppState.docObservable(this.props.uuid)
        .map(doc => doc.subtitle)
        ._onValue(subtitle => this.setState({subtitle}))
    );

    this.unsub.push(
      AppState.docObservable(this.props.uuid)
        .map(doc => doc.content)
        .map(content => this.md.render(content))
        ._onValue(content => this.setState({content}))
    );

    this.unsub.push(
      AppState.docTagsObservable(this.props.uuid)
        ._onValue(tags => this.setState({tags}))
    )
  }

  render() {

    var that = this;

    return (
      <Card>

        <CardTitle
          title={that.state.title}
          subtitle={that.state.subtitle}/>

        <CardText>
          <div dangerouslySetInnerHTML={{__html: that.state.content}}></div>
        </CardText>

        <CardText>
          <TagList tags={this.state.tags} previewMode={true} />
        </CardText>

      </Card>
    );
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub());
  }
}
