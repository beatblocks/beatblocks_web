import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { connect } from 'react-redux';
import { getNextTrack } from '../../actions';
import './commonStyles.css';

class WebPlayerFooter extends Component {
  render() {
    let mp3 = '';
    if (this.props.selectedTrack) mp3 = this.props.selectedTrack.mp3;
    return (
      <div className="WebPlayer-footer-container">
        <ReactAudioPlayer
          src={mp3}
          autoPlay
          controls
          controlsList="nodownload"
          onEnded={this.getNextTrack}
        />
      </div>
    );
  }
  getNextTrack = () => {
    this.props.getNextTrack();
  };
}

const mapStateToProps = (state) => {
  const { selectedTrack, tracks } = state.album;
  return {
    tracks,
    selectedTrack
  };
};

WebPlayerFooter = connect(mapStateToProps, { getNextTrack })(WebPlayerFooter);

export { WebPlayerFooter };
