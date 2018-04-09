import React, { Component } from 'react';
import { WebPlayerSideBar, WebPlayerFooter, BbButton } from '../components/common';
import album from '../assests/albumexample.jpeg';
import './pageStyles.css';

const mockAlbum = {
  img: album,
  title: 'We are the Best',
  artist: 'The Bois',
  releaseYear: '2018',
  songs: [
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    },
    {
      title: 'I am the best',
      metadata: {
        duration: '12:00'
      }
    }
  ]
};

class WebPlayerPlay extends Component {
  render() {
    return (
      <div className="WebPlayer-container">
        <WebPlayerSideBar />
        <div className="WebPlayer-content">
          <div className="WebPlayer-album-info">
            <div className="WebPlayer-album-info-cell">
              <img src={mockAlbum.img} role="presentation" />
            </div>
            <div id="album-details" className="WebPlayer-album-info-cell">
              <div id="album-title"><p>{mockAlbum.title}</p></div>
              <div id="album-artist"><p>{mockAlbum.artist}</p></div>
              <div id="album-info"><p>{mockAlbum.releaseYear} - {mockAlbum.songs.length} Songs</p></div>
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
    return mockAlbum.songs.map((song, index) => {
      return (
        <div className="WebPlayer-track">
          <div className="WebPlayer-track-number"><p>{index + 1}.</p></div>
          <div className="WebPlayer-track-title"><p>{song.title}</p></div>
          <div className="WebPlayer-track-duration"><p>{song.metadata.duration}</p></div>
        </div>
      );
    });
  }
}

export { WebPlayerPlay };
