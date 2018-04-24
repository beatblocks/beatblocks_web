import React, { Component } from 'react';
import ReactHowler from 'react-howler';
import { connect } from 'react-redux';
import { getNextTrack } from '../../actions';
import { getIpfsEndpoint } from '../../utils/ipfsUtils';
import './commonStyles.css';

class WebPlayerFooter extends Component {
  render() {
    const selectedTrackHash = this.props.selectedTrackHash;
    return (
      <div className="WebPlayer-footer-container">
        <ReactHowler
          src={getIpfsEndpoint(selectedTrackHash)}
          playing
          format={['.mpeg']}
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
