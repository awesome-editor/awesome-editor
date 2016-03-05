import React from 'react'
import _ from 'lodash'

import {isObservable} from '../util/Utils'


export default function createContainer(props = {}, containerProps = {}) {

  const observables = Object.keys(props)
    .filter(prop => isObservable(props[prop]))
    .map(prop => ({property: prop, observable: props[prop]}))

  const nonObservableProps = Object.keys(props)
    .filter(prop => !isObservable(props[prop]))
    .reduce((total, prop) => Object.assign(total, {[prop]: props[prop]}), {})

  const {propTypes = {}, getInitialState = {}, getDefaultProps = _.noop} = containerProps

  return StatelessFunctionalContainer => React.createClass({

    propTypes: propTypes,

    getDefaultProps() {
      return getDefaultProps()
    },

    componentWillMount() {

      const that = this

      that.unsub = observables.map(
          obj => obj.observable._onValue(val => that.setState({[obj.property]: val}))
        ) || []
    },

    componentWillUnmount() {

      this.unsub.forEach(unsub => unsub())
    },

    render() {
      return <StatelessFunctionalContainer {...this.state} {...nonObservableProps} {...this.props} />
    }
  })
}
