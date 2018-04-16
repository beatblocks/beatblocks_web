import React, { Component } from 'react';
import { Header, Footer } from '../components/common';
import './pageStyles.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="Page-container">
          blah... home page
        </div>
        <Footer />
      </div>
    );
  }
}

export { Home };
