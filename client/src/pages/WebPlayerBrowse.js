import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebPlayerSideBar, WebPlayerFooter, BbButton } from '../components/common';
import { getArtistsAndInfo } from '../actions';
import './pageStyles.css';

class WebPlayerBrowse extends Component {
  componentWillMount() {
    if (this.props.getArtistsAndInfo) this.props.getArtistsAndInfo();
  }
  render() {
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
        <div className="WebPlayer-content">
        </div>
        <WebPlayerFooter />
      </div>
    );
  }
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

WebPlayerBrowse = connect(null, { getArtistsAndInfo })(WebPlayerBrowse);

export { WebPlayerBrowse };
