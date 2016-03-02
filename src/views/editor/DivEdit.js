import React from 'react'


//thanks https://github.com/lovasoa/react-contenteditable/blob/master/src/react-contenteditable.js
export default class DivEdit extends React.Component {

  constructor() {

    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {

    return (
      <div
        {...this.props}
        ref={(e) => this.htmlEl = e}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable={!this.props.disabled}
        dangerouslySetInnerHTML={{__html: this.props.html}}>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerText;
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerText ) {
      this.htmlEl.innerText = this.props.html;
    }
  }

  emitChange(evt) {

    if (!this.htmlEl) { return; }

    var html = this.htmlEl.innerText;

    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }

    this.lastHtml = html;
  }
}

DivEdit.props = {
  onChange: () => {},
  html: '',
  disabled: false
};