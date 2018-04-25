import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAccounts } from '../../actions';
import logo from '../../assests/logo.png';
import './commonStyles.css';

class Header extends Component {
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
      <header className="Header-container">
        <div className="Header-left">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Header-intro">Beat Blocks</h1>
        </div>
        <div className="Header-right">
          <Link to={'/player/browse'} className="Header-link">Web Player</Link>
          <Link to={'/artist/manage'} className="Header-link">Artists</Link>
          <Link to={'/'} className="Header-link">Home</Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedAccount: state.user.selectedAccount
  };
};

Header = connect(mapStateToProps, { setAccounts })(Header);


export { Header };
