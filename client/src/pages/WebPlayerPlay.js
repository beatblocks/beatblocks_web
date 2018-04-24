import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebPlayerSideBar, WebPlayerFooter, BbButton } from '../components/common';
import { selectTrack, getTimeStamp, subscribe } from '../actions';
import { getIpfsEndpoint } from '../utils/ipfsUtils';
import { weiToEther } from '../utils';
import './pageStyles.css';

class WebPlayerPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      differenceFromToday: props.subscriptionTimeStamp - Math.floor(Date.now() / 1000)
    };
  }
  componentWillMount() {
    this.expirationChecker = setInterval(() => {
      this.setState({
        ...this.state,
        differenceFromToday: this.props.subscriptionTimeStamp - Math.floor(Date.now() / 1000)
      });
    }, 1000);
    this.timeStampChecker = setInterval(() => {
      this.props.getTimeStamp();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.expirationChecker);
    clearInterval(this.timeStampChecker);
  }
  getSubInfoOrCountDown = () => {
    const { subscriptionPriceInWei, subscriptionLengthInSeconds } = this.props;
    if (this.state.differenceFromToday !== undefined && this.state.differenceFromToday <= 0) {
      return (
        <div className="WebPlayer-subscription-area">
          <div><BbButton onClick={this.props.subscribe} classNames={['btn-good']}>Subscribe</BbButton></div>
          <div><p>{weiToEther(subscriptionPriceInWei).toString()} Ether</p></div>
          <div><p>Subscription Length: {subscriptionLengthInSeconds} Seconds</p></div>
        </div>
      );
    }
    return (
      <div className="WebPlayer-subscription-area">
        <div><p>{this.state.differenceFromToday} Seconds</p></div>
        <div><p>Left of Subscription</p></div>
      </div>
    );
  };
  render() {
    const {
      imgHash,
      artistName,
      collectionName,
      releaseYear,
      trackNames,
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
              {this.getSubInfoOrCountDown()}
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
    const { differenceFromToday } = this.state;
    return trackNames.map((song, index) => {
      return (
        <div
          key={index}
          className={differenceFromToday <= 0 ? 'WebPlayer-track-disabled' : 'WebPlayer-track'}
          onClick={differenceFromToday > 0 ? this.selectTrack(index) : undefined}
        >
          <div className="WebPlayer-track-number"><p>{index + 1}.</p></div>
          <div className="WebPlayer-track-title"><p>{song}</p></div>
          {/*<div className="WebPlayer-track-duration"><p>{song.metadata.duration}</p></div>*/}
        </div>
      );
    });
  }
  selectTrack = (index) => () => {
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
    imgHash,
    subscriptionTimeStamp
  } = state.album;
  return {
    artistName,
    collectionName,
    subscriptionLengthInSeconds,
    subscriptionPriceInWei,
    trackNames,
    trackHashes,
    releaseYear,
    imgHash,
    subscriptionTimeStamp
  };
};

WebPlayerPlay = connect(mapStateToProps, { selectTrack, getTimeStamp, subscribe })(WebPlayerPlay);

export { WebPlayerPlay };
