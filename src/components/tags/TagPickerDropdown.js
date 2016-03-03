/*eslint no-extra-parens: 0, no-unused-vars: 0*/
import React from 'react'

import TextField from 'material-ui/lib/text-field'
import Paper from 'material-ui/lib/paper'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import AddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'

import Tag from './Tag'
import TagData from '../../stores/tags/TagData'


const NewTagInput = ({currentTagName, addTag, onChange, onKeyDown, hideDropdown}) => {

  const currentTagNameIsEmpty = currentTagName.trim().length === 0

  return (
    <div>
      <TextField
        hintText='Add tag'
        value={currentTagName}
        onChange={evt => onChange(evt.target.value)}
        onKeyDown={evt => onKeyDown(evt, currentTagName)}
        onBlur={hideDropdown}
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

const tagPickerStyle = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 0
}

const TagPickerMenu = ({autocompleteTagList, onTagItemTouchTap}) => (

  <Paper
    style={tagPickerStyle}
    autoWidth={false}
    zDepth={1}>

    {autocompleteTagList.map((tag, i) => (
      <MenuItem
        key={i}
        onTouchTap={() => onTagItemTouchTap(tag)}
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

export default TagPickerDropdown
