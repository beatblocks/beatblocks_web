import React, { Component } from 'react';
import './commonStyles.css';
import horse from '../../assests/horse.ogg';

class WebPlayerFooter extends Component {
  render() {
    return (
      <div className="WebPlayer-footer-container">
        <audio className="sqs-audio-player" controls controlsList="nodownload">
          <source src={horse} type="audio/ogg" />
        </audio>
      </div>
    );
  }
}

export { WebPlayerFooter };
