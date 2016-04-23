/* eslint no-extra-parens:0 */
import React from 'react'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
// import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'
import {SelectableContainerEnhance as selectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

const SelectableList = selectableContainerEnhance(List)

const DocList = ({docList, docListSelectedIndex, docListSelect, systemCreateDoc}) => {

  return (

    <div>
      <SelectableList
        subheader="Notes"
        insetSubheader={true}
        valueLink={{value: docListSelectedIndex, requestChange: docListSelect}}>

        {docList.map((doc, key) =>
          <ListItem
            key={key}
            leftAvatar={<Avatar icon={<ActionAssignment />} />}
            rightIcon={<ActionInfo />}
            primaryText={doc.title}
            secondaryText={doc.blurb}
          />)}

      </SelectableList>

      <FloatingActionButton onClick={systemCreateDoc}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  )
}

DocList.defaultProps = {
  docList: [],
  docListSelectedIndex: 0,
  docListSelect: () => undefined,
  systemCreateDoc: () => undefined
}

export default DocList
