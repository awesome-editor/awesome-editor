/* eslint no-extra-parens:0 */
import React from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
// import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'
import {SelectableContainerEnhance as selectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance'

const SelectableList = selectableContainerEnhance(List)

export default (doclist, doclistSelectedIndex, doclistSelect) => (

  <SelectableList
    subheader="Notes"
    insetSubheader={true}
    valueLink={{value: doclistSelectedIndex, requestChange: doclistSelect}}>

    {doclist.map(doc =>
      <ListItem
        leftAvatar={<Avatar icon={<ActionAssignment />} />}
        rightIcon={<ActionInfo />}
        primaryText={doc.title}
        secondaryText={doc.blurb}
      />)}

  </SelectableList>
)
