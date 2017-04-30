/* eslint no-extra-parens:0 */
import React from 'react'

import {Link} from 'react-router-dom'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
// import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar'
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment'


const DocList = ({docList, onDocListIemSelect}) => {
  return (

    <List
      subheader="Title"
      insetSubheader={true}>

      {docList.map((doc, key) =>
        <ListItem
          key={key}
          leftAvatar={<Avatar icon={<ActionAssignment />} />}
          rightIcon={<ActionInfo />}
          primaryText={doc.title}
          secondaryText={doc.blurb}
          containerElement={<Link to={`/edit/${doc.uuid}`}/>}
        />)}

    </List>
  )
}

DocList.defaultProps = {
  docList: [],
  onDocListItemSelect: () => undefined
}

export default DocList
