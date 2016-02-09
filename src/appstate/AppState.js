import Kefir from 'kefir'


function upsertDoc(doc) {

  localStorage.setItem(`doc${doc.uuid}`, doc)
  return Kefir.constant(doc)
}

function upsertTag(tag) {

  localStorage.setItem(`tag${tag.uuid}`, tag)
  return Kefir.constant(tag)
}

function getDoc(uuid) {

  const doc = localStorage.getItem(`doc${uuid}`)

  return Kefir.constant(doc)
}

export default {
  upsertDoc,
  upsertTag,
  getDoc
}