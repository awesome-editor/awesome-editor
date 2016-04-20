import React from 'react'

import {isObservable} from '../util/Utils'


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

    this.unsub = this.observables.map(
        obj => obj.observable._onValue(val => this.setState({[obj.property]: val}))
      ) || []
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
