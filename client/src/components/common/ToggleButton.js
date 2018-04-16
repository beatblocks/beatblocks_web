import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleText } from '../../actions';

class ToggleButton extends Component {
  render() {
    return (
    <button onClick={this.props.toggleText}>
      {this.getText()}
    </button>
    );
  }
  getText() {
    if (this.props.toggle) {
      return 'Toggled';
    }
    return 'Untoggled';
  }
}

const mapStateToProps = (state) => {
  return {
    toggle: state.user.toggle
  };
};

ToggleButton = connect(mapStateToProps, { toggleText })(ToggleButton);
export { ToggleButton };
