import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createArtist } from '../../actions';
import { BbButton } from '../common';
import './formStyles.css';

class ArtistForm extends Component {
  createArtist = (values) => {
    this.props.createArtist(values);
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.createArtist)}>
          <div>
            <label>Artist Name</label>
            <div>
              <Field
                name="artistName"
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label>Subscription Price In Ether</label>
            <div>
              <Field
                name="subscriptionPrice"
                component="input"
                type="number"
              />
            </div>
          </div>
          <div>
            <label>Subscription Length</label>
            <div>
              <Field
                name="subscriptionLength"
                component="input"
                type="number"
              />
            </div>
            <div className="PublishForm-buttons">
              <BbButton classNames={['btn-cta-primary']} type="submit">
                Submit
              </BbButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
    priceUsd: state.ethereum.priceUsd
  };
};

ArtistForm = connect(mapStateToProps, { createArtist })(ArtistForm);

ArtistForm = reduxForm({
  form: 'ArtistForm',
  fields: ['artistName', 'subscriptionPrice', 'subscriptionLength'],
})(ArtistForm);

export { ArtistForm };
