import React from 'react'

import {isObservable} from '../util/Utils'


/**
 * In the props you pass normal properties and observables.
 * The observables is where the magic is---for each observable, add a listener,
 * and set the state of the Container equal to the observed value.
 * For example, if props = {obs1: observable} and the observed values are a, b, c...,
 * then this.state.obs1 = a, b, c, ...
 * Container then passes this state to its child as props.
 */
export default class Container extends React.Component {

  constructor(props) {

    super(props)

    this.observables = Object.keys(this.props)
      .filter(prop => isObservable(this.props[prop]))
      .map(prop => ({property: prop, observable: this.props[prop]}))

    this.nonObservableProps = Object.keys(this.props)
      .filter(prop => !isObservable(this.props[prop]) && prop !== 'children')
      .reduce((total, prop) => Object.assign(total, {[prop]: this.props[prop]}), {})
  }

  componentWillMount() {

    this.setState(this.props.children.type.defaultProps || {}, () =>
      this.unsub = this.observables.map(
          obj => obj.observable._onValue(val => this.setState({[obj.property]: val}))
        ) || []
    )
  }

  componentWillUnmount() {

    this.unsub.forEach(unsub => unsub())
  }

  render() {

    return {
      type: this.props.children.type,
      ['$$typeof']: Symbol.for('react.element'),
      props: {...this.state, ...this.nonObservableProps}
    }
  }
}
