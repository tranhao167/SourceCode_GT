import React, { Component } from 'react';
import Footer from '../MainPage/Footer';
import TopMenu from '../MainPage/TopMenu';
import ModalAcceptRegister from './ModalAcceptRegister';
import { Modal, ModalBody, Button } from 'reactstrap';

class CreateCand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CandName: '',
      CandPhone: '',
      CandAddress: '',
      CandEmail: '',
      CandBirthday: '',
      CandGender: '',
      CandMajor: '',
      AccName: '',
      Password: '',
      Retype: '',
      addModalshow: false,
      nameval: '', phoneval: '', mailval: '', majorval: '', addrval: '', accval: '', passval: '', retypeval: '',
      namevalver: false, phonevalver: false, mailvalver: false, majorvalver: false, addrvalver: false, accvalver: false, passvalver: false, retypevalver: false,
      addmodalblur: false
    }
  }
  /**VALIDATION */

  blur = () => {
    const regexp = /[A-Za-z]/;
    if (regexp.exec(this.state.CandName)) {
      this.setState({
        nameval: '', namevalver: true
      })
    } else this.setState({
      nameval: '*Do not enter numbers here', namevalver: false
    })

  }
  // Phone
  blurPhone = () => {
    const regexpPhone = /^\d{10,11}$/;
    if (regexpPhone.exec(this.state.CandPhone)) {
      this.setState({
        phoneval: '', phonevalver: true
      })
    } else this.setState({
      phoneval: '*Numberphone has from 10-11 numbers', phonevalver: false
    })
  }// Address
  blurAddress = () => {
    let test = '';
    if (this.state.CandAddress !== test) {
      this.setState({
        addrval: '', addrvalver: true
      })
    } else if (this.state.CandAddress === test) {
      this.setState({
        addrval: '*Please type in it', addrvalver: false
      })
    }
  }
  // Mail
  blurEmail = () => {
    const regexpEmail = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    if (regexpEmail.exec(this.state.CandEmail)) {
      this.setState({
        mailval: '', mailvalver: true
      })
    } else this.setState({
      mailval: '*Please enter the correct format for Email', mailvalver: false
    })
  }
  // Major
  blurMajor = () => {
    const regexpMajor = /[A-Za-z]/;
    if (regexpMajor.exec(this.state.CandMajor)) {
      this.setState({
        majorval: '', majorvalver: true
      })
    } else this.setState({
      majorval: '*Do not enter numbers here', majorvalver: false
    })
  }
  // Account
  blurAccount = () => {
    let test = '';
    if (this.state.AccName !== test) {
      this.setState({
        accval: '', accvalver: true
      })
    } else if (this.state.AccName === test) {
      this.setState({
        accval: '*Please type in it', accvalver: false
      })
    }
  }
  // Password
  blurPassword = () => {
    let test = '';
    if (this.state.Password !== test) {
      this.setState({
        passval: '', passvalver: true
      })
    } else if (this.state.Password === test) {
      this.setState({
        passval: '*Please type in it', passvalver: false
      })
    }
  }
  // Password
  blurRetype = () => {
    let test = '';
    if (this.state.Retype !== test) {
      this.setState({
        retypeval: '', retypevalver: true
      })
    } else if (this.state.Retype === test) {
      this.setState({
        retypeval: '*Please type in it', retypevalver: false
      })
    }
  }
  /**END VALIDATION */
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,

    });
   
  }
  changeRadio=(e)=>{
    if (e.target.checked) {
        this.setState({
          CandGender: e.target.value
        })
      }
}
  clickModal = () => {
    if (this.state.namevalver === false || this.state.phonevalver === false || this.state.mailvalver === false || this.state.majorvalver === false || this.state.addrvalver === false
      || this.state.accvalver === false || this.state.passvalver === false || this.state.retypevalver === false ||this.state.CandGender===null || this.state.CandBirthday===null) {
      this.setState({
        addmodalblur: true
      })
    } else if (this.state.namevalver === true && this.state.phonevalver === true && this.state.mailvalver === true && this.state.majorvalver === true && this.state.addrvalver === true
      && this.state.accvalver === true && this.state.passvalver === true && this.state.retypevalver === true && this.state.CandGender!==null && this.state.CandBirthday!==null) {
      this.setState({
        addModalshow: true
      })
    }
  }
  onHideBlur = () => {
    this.setState({
      addmodalblur: false
    })
  }
  render() {
    console.log(this.state.CandGender)
    let addModalClose = () => this.setState({ addModalshow: false });
    return (
      <div>
        <TopMenu />
        <div className="Employer_font">
          <hr></hr>

          <div className="container">
            <div className="row" style={{ fontSize: '18px' }}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                  <div
                    className="panel-body"
                    style={{ paddingBottom: "30px", marginBottom: "50px" }}
                  >
                    <div className="row">
                      <h2 style={{ textAlign: 'center' }}>
                        Create Account
                    </h2>
                      {/* 1 : NAME , PHONE */}
                      <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        style={{ marginLeft: "80px", marginTop: "25px" }}
                      >
                        <div className="row">
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Full Name
                            </span>
                              <input
                                type="text"
                                name="CandName"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.CandName}
                                onBlur={this.blur}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.nameval}</div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Phone
                            </span>
                              <input
                                type="text"
                                name="CandPhone"
                                onChange={this.onChange}
                                value={this.state.CandPhone}
                                onBlur={this.blurPhone}
                                className="form-control"
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.phoneval}</div>
                          </div>
                        </div>
                      </div>
                      {/* 2 : EMAIL , ADDRESS*/}
                      <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        style={{ marginLeft: "80px", marginTop: "25px" }}
                      >
                        <div className="row">
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Address
                            </span>
                              <input
                                type="text"
                                name="CandAddress"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.CandAddress}
                                onBlur={this.blurAddress}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.addrval}</div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Email
                            </span>
                              <input
                                type="text"
                                name="CandEmail"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.CandEmail}
                                onBlur={this.blurEmail}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.mailval}</div>
                          </div>
                        </div>
                      </div>
                      {/* 3 : DATE OF BIRTH,GENDER */}
                      <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        style={{ marginLeft: "80px", marginTop: "25px" }}
                      >
                        <div className="row">
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Date of Birth
                            </span>
                              <input
                                type="date"
                                name="CandBirthday"
                                min="1990-01-01"
                                max="2000-12-31"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.CandBirthday}

                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Gender
                            </span>

                              <div className="checkbox">
                                <label>
                                  <input
                                    type="radio"
                                    onChange={this.changeRadio}
                                    value="1"
                                    name="CandGender"

                                  />
                                  <span
                                    className="label"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    MALE
                                </span>
                                </label>
                                <label style={{ marginLeft: "50px" }}>
                                  <input type="radio"
                                    onChange={this.changeRadio}
                                    value="2"
                                    name="CandGender"

                                  />
                                  <span
                                    className="label"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    FEMALE
                                </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 4 :CAND MAJOR , ACCOUNT NAME */}
                      <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        style={{ marginLeft: "80px", marginTop: "25px" }}
                      >
                        <div className="row">
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Major Expected
                            </span>
                              <input
                                type="text"
                                name="CandMajor"
                                className="form-control"
                                onChange={this.onChange}
                                onBlur={this.blurMajor}
                                value={this.state.CandMajor}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.majorval}</div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Account Name
                            </span>
                              <input
                                type="text"
                                name="AccName"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.AccName}
                                onBlur={this.blurAccount}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.accval}</div>
                          </div>
                        </div>
                      </div>
                      {/* 5 :PASSWORD, RETYPE */}
                      <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        style={{ marginLeft: "80px", marginTop: "25px" }}
                      >
                        <div className="row">
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Password
                            </span>
                              <input
                                type="password"
                                name="Password"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.Password}
                                onBlur={this.blurPassword}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.passval}</div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "135px" }}>
                                Retype Password
                            </span>
                              <input
                                type="password"
                                name="Retype"
                                className="form-control"
                                onChange={this.onChange}
                                value={this.state.Retype}
                                onBlur={this.blurRetype}
                                style={{ width: "200px", height:'30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.retypeval}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </form>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginBottom: '3%' }}>
            <button className="btn_accept" onClick={() => this.clickModal()} >CREATE</button>

            <button type="button" className="btn_reset" onClick={() => {console.clear();this.props.history.push("/")}}>BACK</button>
            <ModalAcceptRegister
              isOpen={this.state.addModalshow}
              onhide={addModalClose}
              candname={this.state.CandName}
              candphone={this.state.CandPhone}
              candaddress={this.state.CandAddress}
              candemail={this.state.CandEmail}
              candbirthday={this.state.CandBirthday}
              candgender={this.state.CandGender}
              candmajor={this.state.CandMajor}
              accname={this.state.AccName}
              password={this.state.Password}
              retype={this.state.Retype}
            />
          </div>
        </div>
        {/* Modal for Blur */}
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.addmodalblur}
          onHide={this.state.addmodalblur}
        >
          <ModalBody>
            <h2 style={{ textAlign: 'center',color:'red' }}>ERROR</h2>
            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Please check your input</p>
            <div className="form-row" style={{ textAlign: 'center' }}>

              <div className="form-group col-md-12">
                <Button onClick={() => this.onHideBlur()} className="btn_cancel">OK</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default CreateCand;
