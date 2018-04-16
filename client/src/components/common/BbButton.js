import React, { Component } from 'react';
import './commonStyles.css';

class BbButton extends Component {
  render() {
    return (
      <button className={this.props.className}>{this.props.children}</button>
    );
  }
}

export { BbButton };
