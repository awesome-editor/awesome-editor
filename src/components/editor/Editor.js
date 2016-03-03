/*eslint no-extra-parens: 0*/
import React from 'react'
import _ from 'lodash'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import TextField from 'material-ui/lib/text-field'

import TagList from '../tags/TagList'
import DivEdit from './DivEdit'
import DocData from '../../stores/docs/DocData'
import TagStore from '../../stores/tags/TagStore'
import '../../util/Utils.js'
import AppState from '../../stores/appstate/AppState'


export default class Editor extends React.Component {

  constructor(props) {

    super(props)

    this.state = Object.assign(new DocData())
  }

  componentWillMount() {

    var that = this

    this.unsub = []

    this.unsub.push(
      AppState.docObservable(this.props.uuid)
        ._onValue(doc => that.setState(_.pick(doc, 'uuid', 'title', 'subtitle', 'content')))
    );

    this.unsub.push(
      AppState.docTagsObservable(this.props.uuid)
        ._onValue(tags => that.setState({tags}))
    )
  }

  render() {

    const that = this
    const uuid = this.props.uuid
    const previewMode = this.props.previewMode

    return (
      <Card style={{overflow: 'visible'}}>

        <CardText>
          <TextField
            hintText="Title"
            multiLine={true}
            value={that.state.title}
            fullWidth={true}
            onChange={previewMode ? _.noop : evt => AppState.updateDoc({uuid, title: evt.target.value})}
            />
          <TextField
            hintText="Subtitle"
            multiLine={true}
            value={that.state.subtitle}
            fullWidth={true}
            onChange={previewMode ? _.noop : evt => AppState.updateDoc({uuid, subtitle: evt.target.value})}
            />
        </CardText>

        <CardText>
          <DivEdit
            key="Content"
            style={{minHeight: '3em'}}
            html={this.state.content}
            onChange={previewMode ? _.noop : evt => AppState.updateDoc({uuid, content: evt.target.value})}>
          </DivEdit>
        </CardText>

        <CardText style={{overflow: 'visible'}}>
          <TagList
            autocompleteTag={TagStore.lookupTags}
            createTag={tag => TagStore.createTag(tag)}
            addTag={tag => AppState.addTagToDoc(uuid, tag)}
            tags={that.state.tags}
            previewMode={previewMode}/>
        </CardText>

      </Card>
    )
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub())
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
