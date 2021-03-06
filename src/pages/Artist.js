import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Footer, BbButton } from '../components/common';
import { getIpfsEndpoint } from '../utils/ipfsUtils';
import { deleteCollection } from '../actions';
import { ArtistFormPage } from './ArtistFormPage';
import { weiToEther } from '../utils';
import './pageStyles.css';

class Artist extends Component {
  initiateDeleteCollection = (index) => () => {
    this.props.deleteCollection(index);
  };
  getInitialValuesForUpdate = ({ imgHash, name, releaseYear, trackHashes, trackNames }) => {
    return {
      albumImg: imgHash,
      albumName: name,
      albumYear: releaseYear,
      tracks: trackHashes.map((hash, index) => {
        return {
          name: trackNames[index],
          mp3: getIpfsEndpoint(hash)
        };
      })
    };
  };

  renderCollectionCards = () => {
    return this.props.collectionHeaders.map((header, index) => {
      const initialValues = this.getInitialValuesForUpdate(header);
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
            <BbButton
              classNames={['btn-cta-secondary', 'btn-small']}
              to={{
                pathname: '/artist/publish',
                state: { initialValues, index }
              }}
            >
              Update
            </BbButton>
            <BbButton classNames={['btn-danger', 'btn-small']} onClick={this.initiateDeleteCollection(index)}>
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
        <ArtistFormPage />
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
            <BbButton
              classNames={['btn-good']}
              to={{
                pathname: '/artist/generalInfo',
                state: {
                  initialValues: {
                    artistName: this.props.name,
                    subscriptionPrice: weiToEther(this.props.subscriptionPriceInWei),
                    subscriptionLength: this.props.subscriptionLengthInSeconds,
                  }
                }
              }}
            >
              General Information
            </BbButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isArtist,
    collectionHeaders,
    name,
    subscriptionPriceInWei,
    subscriptionLengthInSeconds,
  } = state.user;
  return {
    isArtist,
    collectionHeaders,
    name,
    subscriptionPriceInWei,
    subscriptionLengthInSeconds,
  };
};

Artist = connect(mapStateToProps, { deleteCollection })(Artist);

export { Artist };
