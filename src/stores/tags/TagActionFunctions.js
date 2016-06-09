import uuid from 'uuid'

import {Channels} from '../constants/Constants'
import {TagActions} from './TagConstants'

import {cast} from '../../util/Utils'

import TagData from './TagData'


export function upsertTag(tag) {

  return {
    channel: Channels.tags,
    actionType: TagActions.upsertTag,
    payload: tag
  }
}

/**
 * Returns a stream that fires with the new tag and then ends
 *
 * @param tag
 * @returns {*}
 */
export function createTagResult(tag) {

  const newTag = {...cast(tag, TagData), uuid: uuid.v4()}

  return {
    channel: Channels.tags,
    actionType: TagActions.createTagResult,
    payload: newTag
  }
}

export function setTags(tags) {

  return {
    channel: Channels.tags,
    actionType: TagActions.setTags,
    payload: tags
  }
}
