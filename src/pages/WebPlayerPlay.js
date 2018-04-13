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
              <div id="album-subscribe"><BbButton className="btn-cta">Subscribe</BbButton></div>
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
    const { tracks } = this.props;
    return tracks.map((song, index) => {
      return (
        <div className="WebPlayer-track" onClick={() => this.props.selectTrack(index)}>
          <div className="WebPlayer-track-number"><p>{index + 1}.</p></div>
          <div className="WebPlayer-track-title"><p>{song.title}</p></div>
          <div className="WebPlayer-track-duration"><p>{song.metadata.duration}</p></div>
        </div>
      );
    });
  }
}

const mapStateToProps = (state) => {
  const { img, title, artist, releaseYear, tracks } = state.album;
  return {
    img,
    title,
    artist,
    releaseYear,
    tracks
  };
};

WebPlayerPlay = connect(mapStateToProps, { selectTrack })(WebPlayerPlay);

export { WebPlayerPlay };
