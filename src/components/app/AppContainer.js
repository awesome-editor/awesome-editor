import createContainer from 'rflux/components/createSimpleContainer'
import AppState from 'rflux/AppState'

import App from './App'


export default createContainer({
  getInitialState() {
    return {
      mainWindow: 'DocList',
      currentDocUuid: null,
      switchToEditor: false,
      switchToList: true,
      systemCreateDoc: () => undefined,
      systemSwitchMainWindow: () => undefined
    }
  },
  getInitialObservableState() {
    return {
      mainWindow: AppState.appMainWindowObservable,
      currentDocUuid: AppState.appCurrentDocUuidObservable,
      switchToEditor: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocEditor' && prev !== cur, false),
      switchToList: AppState.appMainWindowObservable.diff((prev, cur) => cur === 'DocList' && prev !== cur, false),
      //systemCreateDoc: AppState.systemCreateDoc, TODO FIX ME
      systemSwitchMainWindow: AppState.systemSwitchMainWindow
    }
  }
})(App)
