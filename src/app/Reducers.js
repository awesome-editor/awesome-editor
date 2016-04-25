const _reducers = []

export default {

  registerReducer(reducer) { _reducers.push(reducer) },

  get reducers() { return _reducers }
}
