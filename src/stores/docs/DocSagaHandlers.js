import Kefir from 'kefir'
import {Channels} from '../constants/Constants'
import {DocSagas} from './DocConstants'
import {call, listen} from 'rflux/Saga'


export function addTagToDoc({tag, docUuid}, AppState, result) {

  return listen(Channels.docSagas, DocSagas.addTagToDoc)
    .flatMap(({tag, docUuid}) => {

      const create = tag.uuid ? Kefir.constant(tag) : call(AppState.createTagResult, tag)

      return create
    })
    .flatMap(tag => call(AppState.addTagToDocResult, tag, docUuid))
    .onValue(result)
}
