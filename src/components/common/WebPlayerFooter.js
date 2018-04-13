import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { connect } from 'react-redux';
import { getNextTrack } from '../../actions';
import './commonStyles.css';

class WebPlayerFooter extends Component {
  render() {
    const sources = this.getSources(this.props.tracks);
    return (
      <div className="WebPlayer-footer-container">
        <ReactAudioPlayer
          src={sources[this.props.selectedTrack.title]}
          autoPlay
          controls
          controlsList="nodownload"
          onEnded={this.getNextTrack}
        />
      </div>
    );
  }
  getSources(tracks) {
    const sources = {};
    tracks.forEach((track) => {
      sources[track.title] = track.mp3;
    });
    return sources;
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
