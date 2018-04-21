import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Header, Footer, FileInput } from '../components/common';
import './pageStyles.css';

const renderTracks = ({ fields, meta: { error } }) => (
  <div>
  <button className="PublishForm-tracks-add-btn" type="button" onClick={() => fields.push()}>Add Track</button>
    <div>
      {fields.map((track, index) =>
        <div key={index}>
          <label>Track Name</label>
          <Field
            name={`${track}.name`}
            type="text"
            component="input"
            label={`Track #${index + 1}`}
          />
          <Field
            name={`${track}.mp3`}
            type="file"
            component={FileInput}
          />
          <button
            type="button"
            title="Remove Track"
            onClick={() => fields.remove(index)}
          />
        </div>
      )}
    </div>
  </div>
);

class PublishForm extends Component {
  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <div>
        <Header />
          <form onSubmit={this.handleSubmit}>
            <div className="PublishForm-container">
              <div className="PublishForm-fields">
                <div className="PublishForm-album-info">
                  <label>Album Cover Image</label>
                  <div>
                    <Field
                      name="albumImg"
                      component={FileInput}
                      type="file"
                    />
                  </div>
                  <label>Album Name</label>
                  <div>
                    <Field
                      name="albumName"
                      component="input"
                      type="text"
                    />
                  </div>
                  <label>Album Release Year</label>
                  <div>
                    <Field
                      name="albumYear"
                      component="input"
                      type="number"
                    />
                  </div>
                </div>
                <div className="PublishForm-tracks">
                  <label>Album Tracks</label>
                  <FieldArray name="tracks" component={renderTracks} />
                </div>
              </div>
              <div className="PublishForm-buttons">
                <button type="submit">
                  Submit
                </button>
                <button type="button">
                  Clear Values
                </button>
              </div>
            </div>
          </form>
        <Footer />
      </div>
    );
  }
}

PublishForm = reduxForm({
  form: 'PublishForm',
  fields: ['albumImg'],
})(PublishForm);

export { PublishForm };
