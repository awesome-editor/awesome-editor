import Kefir from 'kefir'

import {Channels, ActionTypes} from '../constants/Constants'


function _upsertDoc(doc) {

  localStorage.setItem(`doc${doc.uuid}`, doc)
}

function upsertTag(tag) {

  localStorage.setItem(`tag${tag.uuid}`, tag)
  return Kefir.constant(tag)
}

function getDoc(uuid) {

  const doc = localStorage.getItem(`doc${uuid}`)

  return Kefir.constant(doc)
}

export function persistence(action) {

  if(action.channel === Channels.persistence) {

    switch(action.actionType) {

      case ActionTypes.upsert :
            return _upsertDoc(action.payload)
    }
  }
}
