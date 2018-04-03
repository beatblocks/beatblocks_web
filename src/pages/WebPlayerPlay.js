import React, { Component } from 'react';
import { WebPlayerSideBar, WebPlayerFooter } from '../components/common';
import './pageStyles.css';

class WebPlayerPlay extends Component {
  render() {
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
        <WebPlayerFooter />
      </div>
    );
  }
}

export { WebPlayerPlay };
