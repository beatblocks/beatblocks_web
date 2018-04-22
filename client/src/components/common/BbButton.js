import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './commonStyles.css';

class BbButton extends Component {
  render() {
    const { classNames, to, ...rest } = this.props;
    let classNamesStr = '';
    if (classNames) classNamesStr = classNames.join(' ');

    let onClick;
    if (to) onClick = this.reRoute;

    return (
      <button onClick={onClick} className={`btn-base ${classNamesStr}`} {...rest}>{this.props.children}</button>
    );
  }

  reRoute = () => {
    this.props.history.push(this.props.to);
  }
}

BbButton = withRouter(BbButton);

export { BbButton };
