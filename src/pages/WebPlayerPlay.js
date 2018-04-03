import React, { Component } from 'react';
import { WebPlayerSideBar } from '../components/common';
import './pageStyles.css';

class WebPlayerPlay extends Component {
  render() {
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
      </div>
    );
  }
}

export { WebPlayerPlay };
