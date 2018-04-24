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
                accept=".mp3"
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
  constructor(props) {
    super(props);
    this.updating = false;
    if (this.props.location && this.props.location.state && this.props.location.state.initialValues) {
      this.updating = true;
    }
  }
  componentWillMount() {
    if (this.updating) {
      this.props.initialize(this.props.location.state.initialValues);
    }
  }

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
                        accept=".png, .jpg, .jpeg"
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
              </div>
            </div>
          </form>
        <Footer />
      </div>
    );
  }

  publishCollection = (values) => {
    let index;
    if (this.updating) {
      index = this.props.location.state.index;
    }
    this.props.publishCollection(values, index);
  };
}

const mapStateToProps = (state) => {
  return {
    form: state.form
  };
};

PublishForm = connect(mapStateToProps, { publishCollection })(PublishForm);

PublishForm = reduxForm({
  form: 'PublishForm',
  fields: ['albumImg', 'albumName', 'albumYear', 'tracks'],
})(PublishForm);

export { PublishForm };
