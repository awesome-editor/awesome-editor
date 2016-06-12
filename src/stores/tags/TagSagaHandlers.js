import Kefir from 'kefir'
import AppState from 'rflux/AppState'

/**
 * For now search through every doc
 *
 * @param tag
 * @returns {*}
 */
export function lookupTag(tag) {

  return tag.name.length < 2 ?

    Kefir.constant([]) :

    AppState.tagsObservable
    .take(1)
    .map(tags => tags.tags)
    .map(tags => Object.keys(tags).reduce((matchingTags, tagUuid) =>

      tags[tagUuid].name.indexOf(tag) >= 0 ?
        Object.assign(matchingTags, {[tagUuid]: tags[tagUuid]}) :
        matchingTags,

      {}
    ))
    .map(tagMap => Object.keys(tagMap).map(tagUuid => tagMap[tagUuid]))
}
