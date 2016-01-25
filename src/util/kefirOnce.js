import {Kefir} from 'kefir'


/**
 * Transforms the stream into an observable that ends the first time it fires
 *
 * @param observable an observable
 * @returns {*}
 */
export default function(observable) {

  return Kefir.stream(emitter => {

    function listener(value) {

      emitter.emit(value)
      observable.offValue(listener)
      emitter.end()
    }

    observable.onValue(listener)
  })
}