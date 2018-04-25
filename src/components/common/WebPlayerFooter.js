import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { connect } from 'react-redux';
import { getNextTrack } from '../../actions';
import { getIpfsEndpoint } from '../../utils/ipfsUtils';
import './commonStyles.css';

class WebPlayerFooter extends Component {
  render() {
    const selectedTrackHash = this.props.selectedTrackHash;
    return (
      <div className="WebPlayer-footer-container">
        <ReactAudioPlayer
          src={selectedTrackHash ? getIpfsEndpoint(selectedTrackHash) : undefined}
          autoPlay
          controls
          controlsList="nodownload"
          type="audio/mpeg"
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
  const { selectedTrackHash } = state.album;
  return {
    selectedTrackHash,
  };
};

WebPlayerFooter = connect(mapStateToProps, { getNextTrack })(WebPlayerFooter);

export { WebPlayerFooter };
