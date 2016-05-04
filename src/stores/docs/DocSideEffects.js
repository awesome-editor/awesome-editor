import Kefir from 'kefir'
import {call} from '../../rflux/Saga'


export function addTagToDoc({tag, docUuid}, AppState, result) {

  const create = tag.uuid ? Kefir.constant(tag) : call(AppState.createTagResult, tag)

  return create
    .flatMap(tag => call(AppState.addTagToDocResult, tag, docUuid))
    .onValue(result)
}
