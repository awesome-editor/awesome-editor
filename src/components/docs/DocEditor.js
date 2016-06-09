/*eslint no-extra-parens: 0*/
import React from 'react'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

import TextField from 'material-ui/lib/text-field'

import TagList from '../tags/TagList'
import DocData from '../../stores/docs/DocData'
import DivEdit from './../editor/DivEdit'

const noop = () => undefined

const fonts = '\'M+ 1M\', \'SOURCE CODE PRO\', \'FIRA MONO\', \'DROID SANS MONO\', Consolas, Monospace'

const Editor = ({previewMode, doc, upsertDoc, ...tagStuff}) => {

  return (

    <Card style={{overflow: 'visible'}}>

      <CardText>
        <TextField
          hintText="Title"
          style={{fontFamily: `${fonts} !important`}}
          multiLine={true}
          value={doc.title}
          fullWidth={true}
          onChange={previewMode ? noop : evt => upsertDoc({uuid: doc.uuid, title: evt.target.value})}
        />
      </CardText>

      <CardText key="CardContent">
        <DivEdit
          key="Content"
          style={{minHeight: '3em', fontFamily: `${fonts} !important`}}
          html={doc.content}
          onChange={previewMode ? noop : evt => upsertDoc({uuid: doc.uuid, content: evt.target.value})}>
        </DivEdit>
      </CardText>

      <CardText style={{overflow: 'visible'}}>
        <TagList {...tagStuff} previewMode={previewMode}/>
      </CardText>

    </Card>
  )
}

Editor.defaultProps = {

  previewMode: false,
  doc: new DocData(),
  upsertDoc: () => undefined
}


export default Editor
