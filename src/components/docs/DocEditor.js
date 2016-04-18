/*eslint no-extra-parens: 0*/
import React from 'react'
import _ from 'lodash'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import TextField from 'material-ui/lib/text-field'

import TagList from '../tags/TagList'
import DocData from '../../stores/docs/DocData'
import DivEdit from './../editor/DivEdit'
import TagStore from '../../stores/tags/TagStore'
import '../../util/Utils.js'
import AppState from '../../app/AppState'


const Editor = ({previewMode, doc, tags, updateDoc, autocompleteTag, createTag, addTag}) => (

  <Card style={{overflow: 'visible'}}>

    <CardText>
      <TextField
        hintText="Title"
        multiLine={true}
        value={doc.title}
        fullWidth={true}
        onChange={previewMode ? _.noop : evt => updateDoc({uuid: doc.uuid, title: evt.target.value})}
      />
      <TextField
        hintText="Subtitle"
        multiLine={true}
        value={doc.subtitle}
        fullWidth={true}
        onChange={previewMode ? _.noop : evt => updateDoc({uuid: doc.uuid, subtitle: evt.target.value})}
      />
    </CardText>

    <CardText>
      <DivEdit
        key="Content"
        style={{minHeight: '3em'}}
        html={doc.content}
        onChange={previewMode ? _.noop : evt => updateDoc({uuid: doc.uuid, content: evt.target.value})}>
      </DivEdit>
    </CardText>

    <CardText style={{overflow: 'visible'}}>
      <TagList
        autocompleteTag={autocompleteTag}
        createTag={createTag}
        addTag={tag => addTag(doc.uuid, tag)}
        tags={tags}
        previewMode={previewMode}/>
    </CardText>

  </Card>
)

Editor.defaultProps = {

  previewMode: false,
  doc: new DocData(),
  tags: [],
  updateDoc: () => undefined,
  autocompleteTag: () => undefined,
  createTag: () => undefined,
  addTag: () => undefined
}


export default Editor
