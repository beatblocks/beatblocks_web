import React, { Component } from 'react';
import logo from '../../assests/logo.png';
import './commonStyles.css';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer-container">
        <div className="Footer-main">
          <img src={logo} className="Footer-logo" alt="logo" />
          <h1 className="Footer-intro">Beat Blocks</h1>
        </div>
      </footer>
    );
  }
}

export { Footer };
