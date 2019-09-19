import React, { Component } from 'react';

import Input from './inputs/Input';
import File from './inputs/File';
import Select from './inputs/Select';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class Popup extends Component {
  state = {
    showExtraEmail: false,
    showExtraFields: false,
    mainEmail: 1,
    phoneRegExp: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
  };

  handleShowExtraEmail = () => {
    this.setState({
      showExtraEmail: true
    });
  };

  handleDeleteEmail = () => {
    this.setState({
      showExtraEmail: false,
      mainEmail: 1
    });
  };

  handleShowExtraFields = () => {
    this.setState({
      showExtraFields: !this.state.showExtraFields
    });
  };

  handleChangePrimaryEmail = field => () => {
    this.setState({
      mainEmail: field
    });
  };

  handleFileUpload = setFieldValue => e => {
    const { target: { files } = {} } = e;
    const fr = new FileReader();
    fr.onload = () => {
      setFieldValue('cv', files[0]);
    };
    files.length > 0 && fr.readAsDataURL(files[0]);
  };

  render() {
    const { isOpen, handleClose } = this.props;
    const { showExtraEmail, showExtraFields, mainEmail, phoneRegExp } = this.state;

    const location = [
      { value: 'msk', label: 'Moskow, Russia' },
      { value: 'ny', label: 'New York, USA' },
      { value: 'zp', label: 'Zaporizhzhya, Ukraine' }
    ];

    return isOpen ? <div className="popup-wrapper w-100 vh-100 m-auto pt-5 pb-5">
      <Formik
        initialValues={{
          name: '',
          firstEmail: '',
          secondEmail: '',
          phone: '',
          location: '',
          highlight: '',
          cv: {},
          linkedin: '',
          facebook: '',
          extraHighlight: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('*'),
          firstEmail: Yup.string()
            .email('* This email is invalid')
            .required('*'),
          secondEmail: Yup.string().email('* This email is invalid'),
          phone: Yup.string()
            .matches(phoneRegExp, '* This number is invalid')
            .required('*'),
          location: Yup.string(),
          highlight: Yup.string(),
          linkedin: Yup.string(),
          facebook: Yup.string(),
          cv: Yup.mixed(),
          extraHighlight: Yup.string()
        })}
        onSubmit={values => {
          values.firstEmail = {
            value: values.firstEmail,
            primary: this.state.mainEmail === 1
          };

          values.secondEmail
            ? (values.secondEmail = {
              value: values.secondEmail,
              primary: this.state.mainEmail === 2
            })
            : delete values.secondEmail;

          console.log('submitting', values);
          this.props.handleClose();
        }}
        render={({ values, errors, status, setFieldValue, handleChange, submitCount }) => {
          return (
            <Form
              className={`${isOpen ? 'd-flex' : 'd-none'} m-auto bg-white popup h-100 flex-column justify-content-between`}
            >
              <div className="header p-3 d-flex justify-content-between">
                <span className="text-white font-weight-bold">Update Basic Info</span>
                <button
                  onClick={handleClose}
                  className="col-1 bg-transparent border-0 text-white"
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              <div className="container h-100 p-4 overflow-auto">
                <div className="row mb-3">
                  <div className="col-12 d-flex">
                    <h6>Name</h6>
                    {submitCount > 0 && <span className="text-danger ml-1">{errors.name}</span>}
                  </div>
                  <div className="col">
                    <Input
                      key="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-100"
                      status={status && status.name}
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="email-group col w-100">
                    <div className="d-flex">
                      <h6>
                        Emails
                        <span className="fz-07">
                            (Selected email will be used as primary email for the candidate)
                          </span>
                      </h6>
                      {submitCount > 0 && (
                        <span className="text-danger ml-1">{errors.firstEmail}</span>
                      )}
                    </div>
                    <div className="d-flex pt-2 align-items-center">
                      <div
                        onClick={this.handleChangePrimaryEmail(1)}
                        className={`${
                          mainEmail === 1 ? 'active' : 'inactive'
                          } dot cursor-pointer`}
                      />
                      <Input
                        key="firstEmail"
                        type="text"
                        name="firstEmail"
                        placeholder="Enter a valid email address"
                        className="w-100"
                        status={status && status.firstEmail}
                        onChange={handleChange}
                        value={values.firstEmail}
                      />
                      <div onClick={this.handleDeleteEmail} className="trash cursor-pointer">
                        <i className="fas fa-trash absolute-center" />
                      </div>
                    </div>
                    {showExtraEmail ? (
                      <div className="d-flex pt-2 align-items-center">
                        {values.secondEmail && (
                          <div
                            onClick={this.handleChangePrimaryEmail(2)}
                            className={`${
                              mainEmail === 2 ? 'active' : 'inactive'
                              } dot cursor-pointer`}
                          />
                        )}
                        <Input
                          key="secondEmail"
                          type="text"
                          name="secondEmail"
                          placeholder="Enter a valid email address"
                          className="w-100"
                          error={submitCount > 0 && errors.secondEmail}
                          status={status && status.secondEmail}
                          onChange={handleChange}
                          value={values.secondEmail}
                        />
                        {values.secondEmail && (
                          <div onClick={this.handleDeleteEmail} className="trash cursor-pointer">
                            <i className="fas fa-trash absolute-center" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="cursor-pointer" onClick={this.handleShowExtraEmail}>
                        <div className="d-flex color-main align-items-center mt-2">
                          <div className="plus">+</div>
                          <span>Add email</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 d-flex">
                    <h6>Phone Number</h6>
                    {submitCount > 0 && <span className="text-danger ml-1">{errors.phone}</span>}
                  </div>
                  <div className="col">
                    <Input
                      key="phone"
                      type="tel"
                      name="phone"
                      className="w-100"
                      placeholder="Enter your phone number"
                      status={status && status.phone}
                      onChange={handleChange}
                      value={values.phone}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <h6 className="col-12">Location</h6>
                  <Select
                    key="location"
                    name="location"
                    className="col"
                    options={location}
                    placeholder="Сhoose your city"
                    onChange={value => setFieldValue('location', value)}
                    value={values.location}
                  />
                </div>

                <div className="row mb-3">
                  <h6 className="col-12">Highlight</h6>
                  <div className="col">
                      <textarea
                        key="highlight"
                        name="highlight"
                        cols="30"
                        rows="4"
                        className="col"
                        placeholder="Enter highlights/summary for the candidate"
                        onChange={handleChange}
                        value={values.highlight}
                      />
                  </div>
                </div>

                <div className="row mb-3">
                  <h6 className="col-12">Social Media</h6>
                  <div className="col-12 mb-2 d-flex align-items-center">
                    <div className="mr-3 logo">
                      <i className="far fa-id-badge color-resume" />
                    </div>
                    <div className="w-100 overflow-hidden">
                      <File
                        key="cv"
                        type="file"
                        name="cv"
                        className="w-100"
                        id="uploade-file"
                        onChange={this.handleFileUpload(setFieldValue)}
                        value={values.cv}
                        placeholder="No file selected"
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-2 d-flex align-items-center">
                    <div className="mr-3 logo">
                      <i className="fab fa-linkedin-in color-linkedin" />
                    </div>
                    <Input
                      key="linkedin"
                      name="linkedin"
                      type="text"
                      placeholder="Enter linkedin url of candidate"
                      className="w-100"
                      value={values.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-2 d-flex align-items-center">
                    <div className="mr-3 logo">
                      <i className="fab fa-facebook color-facebook" />
                    </div>
                    <Input
                      key="facebook"
                      name="facebook"
                      type="text"
                      placeholder="Enter facebook url of candidate"
                      className="w-100"
                      value={values.facebook}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div id="extra" className={`${showExtraFields ? 'd-block' : 'd-none'} row`}>
                  <div className="col-12 mb-2 d-flex align-items-center">
                    <div className="w-100 mb-3">
                      <h6>Extra Highlight</h6>
                      <textarea
                        key="extraHighlight"
                        name="extraHighlight"
                        cols="30"
                        rows="4"
                        className="col"
                        placeholder="Enter highlights/summary for the candidate"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <span
                  onClick={this.handleShowExtraFields}
                  className="color-show-more cursor-pointer"
                >
                    Show {showExtraFields ? 'Less' : 'More'}
                  </span>
              </div>
              <div className="footer d-flex justify-content-between p-3">
                <button type="button" onClick={handleClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn bg-main text-white">
                  Update
                </button>
              </div>
            </Form>
          );
        }}
      />
    </div> : <div/>;
  }
}

export default Popup;
