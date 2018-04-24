import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebPlayerSideBar, WebPlayerFooter, BbButton } from '../components/common';
import { selectTrack } from '../actions';
import { getIpfsEndpoint } from '../utils/ipfsUtils';
import { weiToEther } from '../utils';
import './pageStyles.css';

class WebPlayerPlay extends Component {
  render() {
    const {
      imgHash,
      artistName,
      collectionName,
      releaseYear,
      trackNames,
      subscriptionPriceInWei,
      subscriptionLengthInSeconds
    } = this.props;
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
        <div className="WebPlayer-content">
          <div className="WebPlayer-album-info">
            <div className="WebPlayer-album-info-cell">
              <img src={getIpfsEndpoint(imgHash)} role="presentation" />
            </div>
            <div id="album-details" className="WebPlayer-album-info-cell">
              <div><p>{collectionName}</p></div>
              <div><p>{artistName}</p></div>
              <div><p>{releaseYear} - {trackNames.length} Songs</p></div>
              <div><BbButton classNames={['btn-good']}>Subscribe</BbButton></div>
              <div><p>{weiToEther(subscriptionPriceInWei).toString()} Ether</p></div>
              <div><p>Subscription Length: {subscriptionLengthInSeconds} Seconds</p></div>
            </div>
          </div>
          <div className="WebPlayer-album-tracks-cell">
            {this.getAlbumListElements()}
          </div>
        </div>
        <WebPlayerFooter />
      </div>
    );
  }
  getAlbumListElements() {
    const { trackNames } = this.props;
    return trackNames.map((song, index) => {
      return (
        <div
          key={index}
          className={'WebPlayer-track'}
          onClick={this.selectTrack(index)}
        >
          <div className="WebPlayer-track-number"><p>{index + 1}.</p></div>
          <div className="WebPlayer-track-title"><p>{song}</p></div>
          {/*<div className="WebPlayer-track-duration"><p>{song.metadata.duration}</p></div>*/}
        </div>
      );
    });
  }
  selectTrack = (index) => () => {
    if (this.props.subscribed) return;
    this.props.selectTrack(index);
  };
}

const mapStateToProps = (state) => {
  const {
    artistName,
    collectionName,
    subscriptionLengthInSeconds,
    subscriptionPriceInWei,
    trackNames,
    trackHashes,
    releaseYear,
    imgHash
  } = state.album;
  return {
    artistName,
    collectionName,
    subscriptionLengthInSeconds,
    subscriptionPriceInWei,
    trackNames,
    trackHashes,
    releaseYear,
    imgHash
  };
};

WebPlayerPlay = connect(mapStateToProps, { selectTrack })(WebPlayerPlay);

export { WebPlayerPlay };
