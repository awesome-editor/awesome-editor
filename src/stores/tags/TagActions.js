import uuid from 'uuid'

import {Channels} from '../constants/Constants'
import {TagActionTypes, TagSideEffectTypes} from './TagConstants'

import {cast} from '../../util/Utils'

import TagData from './TagData'


/**
 * Looks up tags that are similar
 * @param tagName
 */
export function lookupTag(tagName) {

  return {
    channel: Channels.tagSideEffects,
    actionType: TagSideEffectTypes.lookupTag,
    payload: tagName
  }
}

/**
 * Returns a stream that fires with the new tag and then ends
 *
 * @param tag
 * @returns {*}
 */
export function createTag(tag) {

  const newTag = {...cast(tag, TagData), uuid: uuid.v4()}

  return {
    channel: Channels.tags,
    actionType: TagActionTypes.createTag,
    payload: newTag
  }
}
