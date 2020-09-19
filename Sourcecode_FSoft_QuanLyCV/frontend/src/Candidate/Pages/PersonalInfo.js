import React, { Component } from "react";
import TopMenuSigned from "../../MainPage/TopMenuSigned";
import Footer from "../../MainPage/Footer"
import { Redirect } from "react-router-dom";
import { Modal, ModalBody, Button } from "reactstrap";
import { toast } from "react-toastify";
import ModalAcceptChange from "../Modal/ModalAcceptChange";
import Axios from "axios";
class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false

    } else
      this.state = {
        change: false, loggedIn,
        loading: false,
        emailErr: '',
        addModalshow: false,
        Cancel: false, backCan: false,
        doneback: false,
        disabled: true,
        Link: "",
        CandName: "",
        CandPhone: "",
        Email: '',
        CandGender: '',
        CandAddress: '',
        CandBirthday: '',
        CandMajor: '',
        CandID: '',
        Startday: '',
        Image: '',
        AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
        Status: '',
        UpdateNew: '',
        Password: '',
        nameval: '', phoneval: '', mailval: '', majorval: '', addrval: '',
        namevalver: true, phonevalver: true, mailvalver: true, majorvalver: true, addrvalver: true,
        signinagain: false,edit:false,disbtn:true
      };

  }
  componentDidMount() {
    var AccName = this.state.AccName
    if (AccName === null) {
      alert("Loi");
    } else
      Axios({
        method: 'GET',
        url: `http://localhost:56058/api/EmpAuth?acc=${AccName}`, data: null
      }).then(res => {
        this.setState({
          CandID: res.data.inf.CandID,
          CandName: res.data.inf.CandName,
          CandPhone: res.data.inf.CandPhone,
          Email: res.data.inf.Email,
          CandGender: res.data.inf.CandGender,
          CandAddress: res.data.inf.CandAddress,
          CandBirthday: res.data.inf.CandBirthday,
          CandMajor: res.data.inf.CandMajor,
          Startday: res.data.inf.Startday,
          Image: res.data.inf.Image,
          UpdateNew: res.data.inf.UpdateNew,
          Link: res.data.inf.Link,
          Status: res.data.inf.Status
        })
        if (res.status === 200) {
          Axios({
            method: 'GET',
            url: `http://localhost:56058/api/CandidateInfo?acc=${AccName}`, data: null
          }).then(res => {
            this.setState({
              Password: res.data.Pass
            })
          })
        }
      })

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
    let test = '';
    if (this.state.Email !== test) {
      this.setState({
        mailval: '', mailvalver: true
      })
    } else if (this.state.Email === test) {
      this.setState({
        mailval: '*Please enter the correct format for Email', mailvalver: false
      })
    }
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

  /**END VALIDATION */
  clickModal = () => {
    if (this.state.namevalver === false || this.state.phonevalver === false || this.state.mailvalver === false || this.state.majorvalver === false || this.state.addrvalver === false) {
      this.setState({
        addmodalblur: true
      })
    } else if (this.state.namevalver === true && this.state.phonevalver === true && this.state.mailvalver === true && this.state.majorvalver === true && this.state.addrvalver === true) {
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
  onHide = () => {
    this.setState({
      addModalshow: false
    })
  }
  clickModalCancel = () => {
    this.setState({
      Cancel: true
    })

  }
  onHideCancel = () => {
    this.setState({
      Cancel: false
    })
  }
  goback = () => {
    this.setState({
      backCan: true
    })
  }
  gotochangepass = () => {
    this.setState({
      change: true
    })
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'radio' ? target.checked : target.value;
    this.setState({
      [name]: value,
      edit:true,
      disbtn:false
    });
  };
  notify = () => {
    toast.success("OK")
  }
  openDis = (e) => {
    e.preventDefault();
    this.setState({ disabled: false })
    if(this.state.edit){
      this.setState({disbtn:false})
      this.clickModal();
    }else this.setState({disbtn:true})
  }
  render() {
    let check = null;
    if (this.state.disabled === true) {
      check = (<Button type="submit" className="btn_Edit" >EDIT </Button>)
    } else {
      check = (<Button type="submit" className="btn_accept" disabled={this.state.disbtn}>SAVE </Button>)
    }
    let addModalClose = () => this.setState({ addModalshow: false });
    if (this.state.loggedIn === false) {
      return <Redirect to="/signin" />
    }
    if (this.state.change) {
      return <Redirect to="/changepassword" />
    }
    if (this.state.doneback) {
      this.setState({
        signinagain: true
      })
    }
    if (this.state.backCan) {
      return <Redirect to="/cvmanagement" />
    }
    var {
      CandGender,
      CandID,
      CandName,
      CandPhone,
      Email,
      CandAddress,
      AccName,
      CandMajor,
      Password,
      CandBirthday,
    } = this.state;
    var CB_text = new Date(CandBirthday);
    var CB_year = CB_text.getFullYear();
    var CB_month = CB_text.getMonth();
    var CB_date = CB_text.getDate();

    CandBirthday = CB_year + "-" + (CB_month >= 9 ? CB_month : "0" + (CB_month + 1)) + "-" + (CB_date > 9 ? CB_date : "0" + CB_date);
    return (
      <div>
        <TopMenuSigned />
        <div className="Employer_font">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form onSubmit={this.openDis}>
                  <div
                    className="panel-body"
                    style={{ paddingBottom: "30px", marginBottom: "50px", marginTop: "30px" }}
                  >
                    <div className="row">
                      {/* 0 : ID , NAME */}
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
                              <span className="label" style={{ width: "120px" }}>
                                ID
                            </span>
                              <span
                                className="label"
                                style={{ textAlign: "center" }}
                                value={CandID}
                                key={CandID}
                              >
                                {CandID}
                              </span>
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "120px" }}>
                                NAME
                            </span>
                              <input
                                type="text"
                                name="CandName"
                                required
                                className="form-control"
                                onChange={this.onChange}
                                value={CandName}
                                disabled={this.state.disabled}
                                onBlur={this.blur}
                                style={{ width: "200px", height: '30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.nameval}</div>
                          </div>
                        </div>
                      </div>
                      {/* 1 : Birthday , PHONE */}
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
                              <span className="label" style={{ width: "120px" }}>
                                Birth day
                            </span>
                              <input
                                type="date"
                                name="CandBirthday"
                                className="form-control"
                                onChange={this.onChange}
                                required
                                value={CandBirthday}
                                disabled={this.state.disabled}
                                style={{ width: "200px", height: '30px' }}
                              />
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "120px" }}>
                                PHONE
                            </span>
                              <input
                                type="number"
                                name="CandPhone"
                                onChange={this.onChange}
                                value={CandPhone}
                                onBlur={this.blurPhone}
                                required="required"
                                className="form-control"
                                disabled={this.state.disabled}
                                style={{ width: "200px", height: '30px' }}
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
                              <span className="label" style={{ width: "120px" }}>
                                EMAIL
                            </span>
                              <input
                                type="email"
                                name="Email"
                                className="form-control"
                                onChange={this.onChange}
                                disabled={this.state.disabled}
                                value={Email}
                                onBlur={this.blurEmail}
                                required
                                style={{ width: "200px", height: '30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.mailval}</div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "120px" }}>
                                ADDRESS
                            </span>
                              <input
                                type="text"
                                name="CandAddress"
                                className="form-control"
                                onChange={this.onChange}
                                disabled={this.state.disabled}
                                value={CandAddress}
                                onBlur={this.blurAddress}
                                required="required"
                                style={{ width: "200px", height: '30px' }}
                              />
                            </div>

                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.addrval}</div>
                          </div>
                        </div>
                      </div>
                      {/* 3 : GENDER */}
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
                              <span className="label" style={{ width: "120px" }}>
                                GENDER
                            </span>

                              <div className="radio">
                                <label>
                                  <input
                                    type="radio"
                                    name="CandGender"
                                    onChange={this.onChange}
                                    disabled={this.state.disabled}
                                    value={this.state.CandGender}
                                    checked={this.state.CandGender === 1}
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
                                    onChange={this.onChange}
                                    value={this.state.CandGender}
                                    disabled={this.state.disabled}
                                    name="CandGender"
                                    checked={this.state.CandGender === 2}
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
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "120px" }}>
                                MAJOR EXPECTED
                            </span>
                              <input
                                type="text"
                                name="CandMajor"
                                className="form-control"
                                onChange={this.onChange}
                                value={CandMajor}
                                disabled={this.state.disabled}
                                onBlur={this.blurMajor}
                                style={{ width: "200px", height: '30px' }}
                              />
                            </div>
                            <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.majorval}</div>
                          </div>
                        </div>
                      </div>
                      {/* 4 : ACCOUNT NAME , PASSWORD */}
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
                              <span className="label" style={{ width: "120px" }}>
                                ACCOUNT NAME
                            </span>
                              <input
                                type="text"
                                name="ACCOUNT NAME"
                                className="form-control"
                                onChange={this.onChange}
                                value={AccName}
                                style={{ width: "200px", height: '30px' }}
                                disabled
                              />
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span className="label" style={{ width: "120px" }}>
                                PASSWORD
                            </span>
                              <input
                                type="password"
                                name="Password"
                                onChange={this.onChange}
                                value={Password}
                                className="form-control"
                                disabled
                                style={{ width: "200px", height: '30px' }}
                              />

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ float: "right" }}>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button
                          type="button"
                          onClick={() => this.gotochangepass()}
                          className="btn btn-secondary"
                          style={{
                            marginRight: "165px",
                            marginTop: "5px",
                            padding: "2px",
                            textAlign: "center",
                            height: "35px",
                            width: "100px",
                            fontSize: "12px",
                          }}
                        >
                          Change Password
                      </button>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '5%' }}>
                    {check}
                    <Button type="button" className="btn_reject" onClick={() => this.clickModalCancel()}>Cancel</Button>
                    <ModalAcceptChange
                      isOpen={this.state.addModalshow}
                      onhide={addModalClose}
                      candname={CandName}
                      candbirthday={CandBirthday}
                      candphone={CandPhone}
                      candemail={Email}
                      address={CandAddress}
                      gender={CandGender}
                      major={CandMajor}
                      accname={AccName}
                      password={Password}
                      candid={CandID}
                    />
                    <Modal
                      {...this.props}
                      size="md"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      isOpen={this.state.Cancel}
                      onHide={this.state.Cancel}
                    >
                      <ModalBody>
                        <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Do you want to cancel?</p>
                        <div className="form-row" style={{ textAlign: 'center' }}>

                          <div className="form-group col-md-12">
                            <button className="btn_OK" onClick={() => this.goback()}>OK</button>
                            <button onClick={() => this.onHideCancel()} className="btn_cancel">Cancel</button>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>

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
                        <h2 style={{ textAlign: 'center', color: 'red' }}>ERROR</h2>
                        <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Please check your input</p>
                        <div className="form-row" style={{ textAlign: 'center' }}>

                          <div className="form-group col-md-12">
                            <Button onClick={() => this.onHideBlur()} className="btn_cancel">OK</Button>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default PersonalInfo;
