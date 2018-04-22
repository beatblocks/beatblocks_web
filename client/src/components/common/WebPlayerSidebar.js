import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAccounts } from '../../actions';
import logo from '../../assests/logo.png';
import './commonStyles.css';

class WebPlayerSideBar extends Component {
  componentDidMount() {
    this.props.setAccounts();
    this.accountChecker = setInterval(() => {
      this.props.setAccounts();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.accountChecker);
  }
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

WebPlayerSideBar = connect(null, { setAccounts });

export { WebPlayerSideBar };
