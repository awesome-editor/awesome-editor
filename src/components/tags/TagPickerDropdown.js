/*eslint no-extra-parens: 0, no-unused-vars: 0*/
import React from 'react'

import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import AddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'

import Tag from './Tag'
import TagData from '../../stores/tags/TagData'


const tagPickerStyle = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 0
}

const NewTagInput = ({currentTagName, onTagChange, onKeyDown, addTag}) => {

  const currentTagNameIsEmpty = currentTagName.trim().length === 0

  return (
    <div>
      <TextField
        hintText='Add tag'
        value={currentTagName}
        onChange={evt => onTagChange(evt.target.value)}
        onKeyDown={evt => onKeyDown(evt, currentTagName)}
      />
      <IconButton
        disabled={currentTagNameIsEmpty}
        tooltip='Add tag'
        touch={true}
        onTouchTap={() => addTag(new TagData({name: currentTagName}))}>
        <AddCircle/>
      </IconButton>
    </div>
  )
}

const TagPickerMenu = ({autocompleteTagList, addTagProxy}) => (

  <Paper
    style={tagPickerStyle}
    autoWidth={false}
    zDepth={1}>

    {autocompleteTagList.map((tag, i) => (
      <MenuItem
        key={i}
        onTouchTap={() => addTagProxy(tag)}
        children={<Tag {...tag}/>}
      />
    ))}

  </Paper>
)

const TagPickerDropdown = props => (

  <div>
    <NewTagInput {...props} />
    {props.autocompleteTagList.length ? <div><TagPickerMenu {...props} /></div> : ''}
  </div>
)

TagPickerDropdown.defaultProps = {
  currentTagName: '',
  onTagChange: () => undefined,
  autocompleteTagList: [],
  onKeyDown: () => undefined,
  addTagProxy: () => undefined
}

export default TagPickerDropdown
