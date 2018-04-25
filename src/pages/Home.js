import React, { Component } from 'react';
import { Header, Footer, BbButton } from '../components/common';
import './pageStyles.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="HomePage-container">
          <h2>Artists Make Their Music</h2>
          <p>That is why artists should the ones in control of their music.
          In other music streaming platforms, artists are at the mercy of the content streamer when it comes to
          publishing, pay, and representation. It is our mission at BeatBlocks to put the artists back in control
          of their music get treated fairly.</p>
          <div>
            <BbButton classNames={['btn-cta-primary']} to="/player/browse">
              Browse
            </BbButton>
            <BbButton classNames={['btn-cta-secondary']} to="/artist/manage">
              Artists
            </BbButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export { Home };
