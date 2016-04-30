import {Kefir} from 'kefir'


/**
 * The return of the Kefir emitter
 *
 * @returns {*}
 */
export default function() {

  let emitter;

  /**
   * Just used once while emitter loads
   *
   * @type {Array}
   */
  const oneTimeCache = []

  const stream = Kefir.stream(_emitter => {

    oneTimeCache.forEach(x => _emitter.emit(x))
    oneTimeCache.length = 0

    emitter = _emitter

    return () => emitter = null
  })

  stream.emit = function emit(x) {

    if (emitter) {

      emitter.emit(x)
    }
    else {

      oneTimeCache.push(x)
    }
  }

  return stream
}
