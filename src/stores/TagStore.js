import Kefir from 'kefir'
import uuid from 'uuid'

import TagData from '../types/TagData'

import kefirEmitter from '../util/kefirEmitter'
import {cast} from '../util/Utils'


const tagAction = kefirEmitter()

const createTagActionStream = tagAction
  .filter(action => action.actionType === 'create')
  .map(action => cast(action.tag, TagData))
  .map(tag => tags => {

    tags[tag.uuid] = tag;

    return tags;
  });

// TODO tag crud

const tagsObservable = Kefir.merge([
  createTagActionStream
])
  .scan((prevTags, modificationFunc) => modificationFunc(prevTags), {});


/**
 * Looks up tags that are similar
 * @param tagUuid
 */
function lookupTags(tagUuid) {

  return Kefir.constant([
    new TagData({uuid: uuid.v4(), name: 'foo', path: [{uuid: uuid.v4(), name: 'bar'}]}),
    new TagData({uuid: uuid.v4(), name: 'aha'})
  ])
}

export default {

  lookupTags,

  /**
   * Returns a stream that fires with the new tag and then ends
   *
   * @param tag
   * @returns {*}
   */
  createTag: function(tag) {

    tag = tag || {}

    tagAction.emit({
      actionType: 'create',
      tag: Object.assign(tag, {uuid: uuid.v4()})
    });

    return this.tagObservable(tag.uuid).filter(tag => tag).take(1)
  },

  tagObservable: uuid =>
    tagsObservable
      .map(tags => tags[uuid])
      .filter(tag => tag)
}
