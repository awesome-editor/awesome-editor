import uuid from 'uuid'

import {Channels, ActionTypes} from '../constants/Constants'
import {TagActionTypes} from './TagConstants'

import {cast} from '../../util/Utils'

import TagData from './TagData'


/**
 * Looks up tags that are similar
 * @param tagUuid
 */
export function lookupTag(tagUuid) {

  return {
    channel: Channels.tags,
    actionType: TagActionTypes.lookupTag,
    payload: tagUuid
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
    actionType: ActionTypes.create,
    payload: newTag
  }
}
