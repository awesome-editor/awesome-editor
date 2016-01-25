import {Observable} from 'kefir'


// TODO remove this
const originalOnValue = Observable.prototype.onValue

/**
 * This makes kefir#onValue work more like BaconJS---it returns an unsubscribe function instead of the observable.
 * Makes unsubscribring easier.
 *
 * @param fn listener
 * @returns {Function} unsub function
 */
Observable.prototype.onValue = function(fn) {

  originalOnValue.call(this, fn)

  // return an unsub function
  return () => this.offValue(fn)
}

