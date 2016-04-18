import {put, call, listen} from '../../app/Saga'


function showDocPreview(uuid) {


}

function authorize(user, password) {

  return call(Api.authorize, user, password)
    .take(1)
    .onError(error => put({type: 'LOGIN_ERROR'}, error)
}

function loginFlow() {

  const loginStream = listen('LOGIN_REQUEST')
  const logoutStream = listen('LOGOUT')
  const authStream = loginStream.flatMapLatest(({user, password}) => call(authorize, user, password))

  Kefir.merge([loginStream, logoutStream, authorizeStream])
    .scan((state, event) => {
      return event.actionType !== 'auth' ?
      {state: event.actionType, event} :
      {state, event}
    }, {})
    .filter(state => !(state.state !== 'login' && state.event.actionType === 'auth'))
    .map(state => state.event)
    .onValue(event => {
      switch(event.actionType) {
        case 'AUTHORIZE' : put({type: 'LOGIN_SUCESS', event.payload)
        case 'LOGOUT': call(Api.clearItem, 'token')_
      }
    })

}
