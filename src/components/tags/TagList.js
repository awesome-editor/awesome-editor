/*eslint no-extra-parens: 0*/
import Kefir from 'kefir'
import React from 'react'

import Tag from './Tag'
import TagPickerContainer from './TagPickerDropdownContainer'


/**
 * Behavior:
 * - add an existing tag to the list
 * - remove a tag from the list
 * - create a new tag and add it to the list
 */
const TagList = props => (

    <div className='tags' style={{position: 'relative'}}>

      {props.previewMode ? '' : <TagPickerContainer {...props} />}

      <ul>
        {props.tags.map(tag => {
          return (
            <li key={tag.uuid}>
              <Tag {...tag}/>
            </li>
          );
        })}
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
};

export default TagList
