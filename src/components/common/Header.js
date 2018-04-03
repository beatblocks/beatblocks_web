import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assests/logo.png';
import './commonStyles.css';

class Header extends Component {
  render() {
    return (
      <header className="Header-container">
        <div className="Header-left">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Header-intro">Beat Blocks</h1>
        </div>
        <div className="Header-right">
          <Link to={'/player'} className="Header-link">Web Player</Link>
          <Link to={'/publish'} className="Header-link">Publish</Link>
        </div>
      </header>
    );
  }
}

export { Header };
