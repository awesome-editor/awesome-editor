/*eslint no-extra-parens: 0, no-unused-vars: 0*/
import Kefir from 'kefir'
import React from 'react'

import kefirEmitter from 'rflux/utils/kefirEmitter'

import Tag from './Tag'
import TagPickerDropdownContainer from './TagPickerDropdownContainer'


/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 * @param{Object} props
 * @constructor
 */
const TagList = props => {

  const {previewMode, tags, uuid} = props

  return (

    <div className='tags' style={{position: 'relative'}}>

      {previewMode ? '' : <TagPickerDropdownContainer uuid={uuid} />}

      <ul>
        {tags.map(tag => (
          <li key={tag.uuid}>
            <Tag {...tag}/>
          </li>
        ))}
      </ul>

    </div>
  )
}

TagList.defaultProps = {

  previewMode: false,
  /**
   * Current tags
   */
  tags: [],
  uuid: ''
}

export default TagList
