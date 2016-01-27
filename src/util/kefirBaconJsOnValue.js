import {Observable} from 'kefir'


/**
 * This makes kefir#onValue work more like BaconJS---it returns an unsubscribe function instead of the observable.
 * Makes unsubscribring easier.
 *
 * @param fn listener
 * @returns {Function} unsub function
 */
Observable.prototype._onValue = function(fn) {

  Observable.prototype.onValue.call(this, fn)

  // return an unsub function
  return () => this.offValue(fn)
}

