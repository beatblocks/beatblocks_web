import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebPlayerSideBar, WebPlayerFooter, BbButton } from '../components/common';
import { selectTrack } from '../actions';
import './pageStyles.css';

class WebPlayerPlay extends Component {
  render() {
    const { img, title, artist, releaseYear, tracks } = this.props;
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
        <div className="WebPlayer-content">
          <div className="WebPlayer-album-info">
            <div className="WebPlayer-album-info-cell">
              <img src={img} role="presentation" />
            </div>
            <div id="album-details" className="WebPlayer-album-info-cell">
              <div id="album-title"><p>{title}</p></div>
              <div id="album-artist"><p>{artist}</p></div>
              <div id="album-info"><p>{releaseYear} - {tracks.length} Songs</p></div>
              <div id="album-subscribe"><BbButton classNames={['btn-cta-primary']}>Subscribe</BbButton></div>
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
    const { tracks, subscribed } = this.props;
    return tracks.map((song, index) => {
      return (
        <div
          key={index}
          className={subscribed ? 'WebPlayer-track' : 'WebPlayer-track-disabled'}
          onClick={this.selectTrack(index)}
        >
          <div className="WebPlayer-track-number"><p>{index + 1}.</p></div>
          <div className="WebPlayer-track-title"><p>{song.title}</p></div>
          <div className="WebPlayer-track-duration"><p>{song.metadata.duration}</p></div>
        </div>
      );
    });
  }
  selectTrack = (index) => () => {
    if (!this.props.subscribed) return;
    this.props.selectTrack(index);
  };
}

const mapStateToProps = (state) => {
  const { img, title, artist, releaseYear, tracks, subscribed } = state.album;
  return {
    img,
    title,
    artist,
    releaseYear,
    tracks,
    subscribed
  };
};

WebPlayerPlay = connect(mapStateToProps, { selectTrack })(WebPlayerPlay);

export { WebPlayerPlay };
