import DocStore from '../stores/DocStore'
import Storage from '../stores/Storage'


DocStore.latestUpdate.flatMap(Storage.upsertDoc).onValue(() => {})
 //on Error

