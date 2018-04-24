import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebPlayerSideBar, WebPlayerFooter, BbButton } from '../components/common';
import { getArtistsAndInfo } from '../actions';
import { getIpfsEndpoint } from '../utils/ipfsUtils';
import { weiToEther } from '../utils';
import './pageStyles.css';

class WebPlayerBrowse extends Component {
  componentWillMount() {
    this.props.getArtistsAndInfo();
  }
  render() {
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
        <div className="WebPlayerBrowse-content">
          <div>
          {this.props.browseData &&
            this.renderAlbumCards()
          }
          </div>
        </div>
        <WebPlayerFooter />
      </div>
    );
  }

  renderAlbumCards = () => {
    return this.props.browseData.map((artist) => {
      const sumOfSongs = artist.collectionHeaders.reduce(((total, ch) => total + ch.trackHashes.length), 0);
      return artist.collectionHeaders.map((collectionHeader, index) => {
        const { imgHash } = collectionHeader;
        return (
          <div className="WebPlayerBrowse-card" key={index}>
            <div>
              <img role="presentation" src={getIpfsEndpoint(imgHash)} />
            </div>
            <div>
              <p>Album: {collectionHeader.name}</p>
              <p>Songs: {collectionHeader.trackHashes.length}</p>
              <p>Year: {collectionHeader.releaseYear}</p>
            </div>
            <div>
              <p>Artist: {artist.name}</p>
              <p>Songs Published: {sumOfSongs}</p>
            </div>
            <div>
              <p>Subscription Price: {weiToEther(artist.subscriptionPriceInWei).toString()} Ether</p>
              <p>Subscription Length: {artist.subscriptionLengthInSeconds} Seconds</p>
            </div>
            <div id="subscribe-btn-div">
              <BbButton classNames={['btn-good']}>
                Subscribe
              </BbButton>
            </div>
          </div>
        );
      })
    });
  }
}

const mapStateToProps = (state) => {
  const { browseData } = state.browse;
  return {
    browseData
  };
};

WebPlayerBrowse = connect(mapStateToProps, { getArtistsAndInfo })(WebPlayerBrowse);

export { WebPlayerBrowse };
