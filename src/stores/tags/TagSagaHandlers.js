import Kefir from 'kefir'
import AppState from 'rflux/AppState'

/**
 * For now search through every doc
 *
 * @param tagName
 * @returns {*}
 */
export function lookupTag(tagName) {

  //TODO why is AppState here?
  return AppState.tagsObservable
    .take(1)
    .map(tags => tags.tags)
    .map(tags => Object.keys(tags).reduce(

      (matchingTags, tagUuid) =>
        tags[tagUuid].name.indexOf(tagName) >= 0 ?
          Object.assign(matchingTags, {[tagUuid]: tags[tagUuid]}) :
          matchingTags,
      {}
    ))
    .map(tagMap => Object.keys(tagMap).map(tagUuid => tagMap[tagUuid]))
}
