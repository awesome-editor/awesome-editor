/*eslint no-extra-parens: 0, no-unused-vars: 0*/
import Kefir from 'kefir'
import React from 'react'

import kefirEmitter from '../../rflux/support/kefirEmitter'

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
const TagList = ({previewMode, tags, lookupTag, addTag, createTag}) => {

  const opts = {previewMode, tags, lookupTag, addTag, createTag}

  return (

    <div className='tags' style={{position: 'relative'}}>

      {previewMode ? '' : <TagPickerDropdownContainer {...opts} />}

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
   * Look up potential tag matches
   *
   * @returns {stream} with tag matches
   */
  lookupTag: () => Kefir.constant([]),
  addTag: () => undefined,
  createTag: () => undefined,

  /**
   * Current tags
   */
  tags: []
}

export default TagList
