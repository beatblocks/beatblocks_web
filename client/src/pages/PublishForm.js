import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { publishCollection } from '../actions';
import { Header, Footer, FileInput, BbButton } from '../components/common';
import './pageStyles.css';

const renderTracks = ({ fields, meta: { error } }) => (
  <div className="tracks-block">
    <label>Album Tracks</label>
    <div>
      <BbButton classNames={['btn-good', 'btn-small']} type="button" onClick={() => fields.push()}>Add Track</BbButton>
    </div>
    <div className="tracks-container">
      {fields.map((track, index) =>
        <div className="track-card" key={index}>
          <div className="track-info">
            <label>Track {index + 1}</label>
            <div>
              <Field
                name={`${track}.name`}
                type="text"
                component="input"
                placeholder="Track Name"
                label={`Track #${index + 1}`}
              />
            </div>
            <div>
              <Field
                name={`${track}.mp3`}
                type="file"
                component={FileInput}
              />
            </div>
          </div>
          <div>
            <BbButton
              type="button"
              classNames={['btn-cta-secondary', 'btn-small']}
              onClick={() => fields.remove(index)}
            >
              Remove
            </BbButton>
          </div>
        </div>
      )}
    </div>
  </div>
);

class PublishForm extends Component {
  publishCollection = (values) => {
    this.props.publishCollection(values);
  };

  render() {
    return (
      <div>
        <Header />
          <form onSubmit={this.props.handleSubmit(this.publishCollection)}>
            <div className="PublishForm-container">
              <div className="PublishForm-fields">
                <div className="PublishForm-album-info">
                  <div>
                    <label>Album Cover Image</label>
                    <div>
                      <Field
                        name="albumImg"
                        component={FileInput}
                        type="file"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Album Name</label>
                    <div>
                      <Field
                        name="albumName"
                        component="input"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Album Release Year</label>
                    <div>
                      <Field
                        name="albumYear"
                        component="input"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <FieldArray name="tracks" component={renderTracks} />
              <div className="PublishForm-buttons">
                <BbButton classNames={['btn-cta-primary']} type="submit">
                  Submit
                </BbButton>
                <BbButton classNames={['btn-danger']} type="button">
                  Clear
                </BbButton>
              </div>
            </div>
          </form>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.form
  };
};

PublishForm = connect(mapStateToProps, { publishCollection })(PublishForm);

PublishForm = reduxForm({
  form: 'PublishForm',
  fields: ['albumImg'],
})(PublishForm);

export { PublishForm };
