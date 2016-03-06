import {upsert} from '../persistence/PersistenceActions'
import {Channels, ActionTypes} from '../constants/Constants'
import {TagActionTypes} from './TagConstants'
import {stateWithSideEffects} from '../sideeffects/SideEffects'
import TagData from './TagData'
import uuid from 'uuid'

const initialState = {
  newTagUuid: null
}

/**
 * Supports partial tag updates
 *
 * @param tags
 * @param tag
 * @returns new tags
 * @private
 */
function _upsertTag(tags, tag) {

  const curTag = tags[tag.uuid] || {}
  const newTag = {...curTag, ...tag}
  const newTagEntry = {[tag.uuid]: newTag}
  const newTags = {...tags, ...newTagEntry}

  return stateWithSideEffects(newTags, upsert(newTag))
}

/**
 * Create the tag and tell the world about it
 *
 * @param tags
 * @param tag
 * @returns {*}
 * @private
 */
function _createTag(tags, tag) {

  const upsert = _upsertTag(tags, tag)
  const newTagUuid = stateWithSideEffects({newTagUuid: tag.uuid})

  return upsert.combine(newTagUuid)
}

/**
 * Looks up tags that are similar
 * @param tagUuid
 */
function _lookupTag(tags, tagUuid) {

  const fakeMatches = [
    new TagData({uuid: uuid.v4(), name: 'foo', path: [{uuid: uuid.v4(), name: 'bar'}]}),
    new TagData({uuid: uuid.v4(), name: 'aha'})
  ]

  return stateWithSideEffects({...tags, ...{lookupTag: fakeMatches}})
}

export function tags(tags = initialState, action) {

  if (action.channel === Channels.tags) {

    switch (action.actionType) {
      case ActionTypes.create:
        return _createTag(tags, action.payload)
      case TagActionTypes.lookupTag:
        return _lookupTag(tags, action.payload)
      default:
        throw new Error(`${action.actionType} not supported`)
    }
  }

  return stateWithSideEffects(tags)
}

