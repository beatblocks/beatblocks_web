import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Footer, BbButton } from '../components/common';
import { ArtistForm } from '../components/forms';
import './pageStyles.css';

class Artist extends Component {
  render() {
    if (!this.props.isArtist) {
      return (
        <div>
          <Header />
          <div className="ArtistPage-container">
            <h2>Not signed up?</h2>
            <p>Sign up to publish your content!</p>
            <ArtistForm />
          </div>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <Header />
        Manage Content
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isArtist: state.user.isArtist
  };
};

Artist = connect(mapStateToProps, { })(Artist);

export { Artist };
