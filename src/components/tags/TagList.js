/*eslint no-extra-parens: 0, no-unused-vars: 0*/
import Kefir from 'kefir'
import React from 'react'

import kefirEmitter from '../../util/kefirEmitter'

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
const TagList = props => (

  <div className='tags' style={{position: 'relative'}}>

    {props.previewMode ? '' : <TagPickerDropdownContainer {...props} />}

    <ul>
      {props.tags.map(tag => (
        <li key={tag.uuid}>
          <Tag {...tag}/>
        </li>
      ))}
    </ul>

  </div>
)

TagList.defaultProps = {

  previewMode: false,

  /**
   * Look up potential tag matches
   *
   * @returns {stream} with tag matches
   */
  autocompleteTag: () => Kefir.constant([]),

  addTag: () => kefirEmitter(),

  createTag: () => kefirEmitter(),

  /**
   * Current tags
   */
  tags: []
}

export default TagList
