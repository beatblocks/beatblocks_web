import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assests/logo.png';
import './commonStyles.css';

class WebPlayerSideBar extends Component {
  render() {
    return (
      <div className="WebPlayer-sidebar">
        <div className="WebPlayer-sidebar-logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="WebPlayer-sidebar-links-container">
          <Link to={'/player/browse'} className="WebPlayer-sidebar-link">Browse</Link>
          <Link to={'/player/music'} className="WebPlayer-sidebar-link">My Music</Link>
          <Link to={'/'} className="WebPlayer-sidebar-link">Home</Link>
        </div>
      </div>
    );
  }
}

export { WebPlayerSideBar };
