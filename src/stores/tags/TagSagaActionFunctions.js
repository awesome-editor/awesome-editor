import {Channels} from '../constants/Constants'
import {TagSagas} from './TagConstants'


/**
 * Looks up tags that are similar
 * @param tagName
 */
export function lookupTag(tagName) {

  return {
    channel: Channels.tagSagas,
    actionType: TagSagas.lookupTag,
    payload: tagName
  }
}
