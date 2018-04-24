import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Footer, BbButton } from '../components/common';
import { ArtistForm } from '../components/forms';
import { getIpfsEndpoint } from '../utils/ipfsUtils';
import './pageStyles.css';

class Artist extends Component {
  renderCollectionCards = () => {
    return this.props.collectionHeaders.map((header, index) => {
      const { imgHash, name, releaseYear, trackHashes } = header;
      return (
        <div className="ArtistPage-collection-card" key={index}>
          <div>
            <img role="presentation" src={getIpfsEndpoint(imgHash)} />
          </div>
          <div>
            <p>Name: {name}</p>
          </div>
          <div>
            <p>Songs: {trackHashes ? trackHashes.length : 0}</p>
          </div>
          <div>
            <p>Year: {releaseYear}</p>
          </div>
          <div>
            <BbButton classNames={['btn-cta-secondary', 'btn-small']}>
              Update
            </BbButton>
            <BbButton classNames={['btn-danger', 'btn-small']}>
              Remove
            </BbButton>
          </div>
        </div>
      );
    });
  };
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
        <div className="ArtistPage-container">
          <h2>Manage Content</h2>
          <div className="ArtistPage-manage-container">
            {this.props.collectionHeaders &&
              this.renderCollectionCards()
            }
          </div>
          <div>
            <BbButton classNames={['btn-cta-primary']} to={'/artist/publish'}>
              Publish
            </BbButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isArtist, collectionHeaders } = state.user;
  return {
    isArtist,
    collectionHeaders
  };
};

Artist = connect(mapStateToProps, { })(Artist);

export { Artist };
