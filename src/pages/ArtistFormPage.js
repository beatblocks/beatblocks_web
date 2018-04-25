import React, { Component } from 'react';
import { Header, Footer } from '../components/common';
import { ArtistForm } from '../components/forms';

class ArtistFormPage extends Component {
  constructor(props) {
    super(props);
    this.updating = false;
    if (this.props.location && this.props.location.state && this.props.location.state.initialValues) {
      this.updating = true;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="ArtistPage-container">
          {!this.updating &&
          <div>
            <h2>Not signed up?</h2>
            <p>Sign up to publish your content!</p>
          </div>
          }
          {this.updating &&
          <div>
            <h2>Update General Information</h2>
          </div>
          }
          <ArtistForm
            updating={this.updating}
            initialValues={this.updating ? this.props.location.state.initialValues : undefined}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export { ArtistFormPage };
