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


const Editor = ({title, subtitle, content, tags, updateDoc, previewMode, uuid}) => (

  <Card style={{overflow: 'visible'}}>

    <CardText>
      <TextField
        hintText="Title"
        multiLine={true}
        value={title}
        fullWidth={true}
        onChange={previewMode ? _.noop : evt => updateDoc({uuid, title: evt.target.value})}
      />
      <TextField
        hintText="Subtitle"
        multiLine={true}
        value={subtitle}
        fullWidth={true}
        onChange={previewMode ? _.noop : evt => updateDoc({uuid, subtitle: evt.target.value})}
      />
    </CardText>

    <CardText>
      <DivEdit
        key="Content"
        style={{minHeight: '3em'}}
        html={content}
        onChange={previewMode ? _.noop : evt => updateDoc({uuid, content: evt.target.value})}>
      </DivEdit>
    </CardText>

    <CardText style={{overflow: 'visible'}}>
      <TagList
        autocompleteTag={TagStore.lookupTags}
        createTag={tag => TagStore.createTag(tag)}
        addTag={tag => AppState.addTagToDoc(uuid, tag)}
        tags={tags}
        previewMode={previewMode}/>
    </CardText>

  </Card>
)

export default class EditorContainer extends React.Component {

  constructor(props) {

    super(props)

    this.state = Object.assign(new DocData())
  }

  componentWillMount() {

    var that = this

    this.unsub = []

    // observable => state => props
    // define other functions
    this.unsub.push(
      AppState
        .docObservable(this.props.uuid)
        ._onValue(doc => that.setState(_.pick(doc, 'uuid', 'title', 'subtitle', 'content')))
    )

    this.unsub.push(
      AppState
        .docTagsObservable(this.props.uuid)
        ._onValue(tags => that.setState({tags}))
    )
  }

  render() {

    return (
      <Editor
        {...this.state}
        {...this.props}
        updateDoc={AppState.updateDoc}
      />
    )
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub())
  }
}


EditorContainer.defaultProps = {

  /**
   * doc uuid
   */
  uuid: '',
  /**
   * Preview mode
   */
  previewMode: false
}
