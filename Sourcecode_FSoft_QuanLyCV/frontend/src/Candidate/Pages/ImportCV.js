import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";
import ModalError from '../Modal/Modalerror';
import TopMenuSigned from '../../MainPage/TopMenuSigned';
import Footer from '../../MainPage/Footer';
import { Modal, ModalBody, Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import ModalBack from "../Modal/ModalBack";
const qs = require("qs");

class ImportCV extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
      this.state = { loggedIn }
    } else
      this.state = {
        addModalshow: false, modalError: false, modalBack: false,
        doneback: false, loggedIn, array: [],loading:false,
        CandID: '',
        Link: '',
        CandName: '',
        CandPhone: '',
        Email: '',
        Image:'',
        CandGender: '',
        CandAddress: '',
        CandBirthday: '',
        CandMajor: '',
        AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),setLoading: false,setImage:''
      };
  }
  componentDidMount() {
    Axios({
      method: 'GET',
      url: `http://localhost:56058/api/EmpAuth?acc=${this.state.AccName}`, data: null
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
        Status: res.data.inf.Status
      })
    })
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onReset = (e) => {
    this.setState({
      txtLink: "",
    });
  };
  clickModal = () => {
    this.setState({
      addModalshow: true
    })

  }
  onHide = () => {
    this.setState({
      addModalshow: false
    })
  }
  modalError = () => {
    this.setState({
      modalError: true
    })
  }
  notify = () => {
    toast.success("Imported!");
  }
  onSave = () => {
    var {
      CandID,
      Link,
      CandName,
      CandPhone,
      Email,
      CandGender,
      CandAddress,
      CandBirthday,
      CandMajor,
      AccName
    } = this.state;
    Axios.post(
      `http://localhost:56058/api/CandidateImport`,
      qs.stringify({
        CandName: CandName,
        CandPhone: CandPhone,
        Email: Email,
        CandGender: CandGender,
        CandAddress: CandAddress,
        CandBirthday: CandBirthday,
        CandID: CandID,
        Image: this.state.setImage,
        CandMajor: CandMajor,
        Link: Link,
        AccName: AccName,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        this.setState({
          doneback: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });

  };
  onImageChange = (e) => {
    this.setState({
      selectedfile: e.target.files[0],
      set: URL.createObjectURL(e.target.files[0])
    })
  }
  upLoad = () => {
    this.setState({
      loading: true
    })
    const data = new FormData();
    data.append("file", this.state.selectedfile);
    data.append("upload_preset", "boywaygl");
    this.setState({
      setLoading: true
    })
    Axios.post("https://api.cloudinary.com/v1_1/boywaygl/image/upload", data)
      .then((response) => {
        console.log(response)
        this.setState({
          setImage: response.data.url,
          setLoading: false,
        });
        if (response.status === 200) {
          this.notify();
          this.onSave()
          setTimeout(() => {
            this.setState({
              loading: false
            });
          }, 100000)
        } else {
          alert("ERROR");
          this.onHide()
        }

      }).catch(err => {
        alert(err)
      });
  };
  ModalBack = () => {
    this.setState({
      modalBack: true
    })
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/signin" />
    }
    let modalErrorClose = () => { this.setState({ modalError: false }) }
    let modalBackClose = () => { this.setState({ modalBack: false }) }
    if (this.state.doneback) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <TopMenuSigned />
        <div className="Employer_font">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                  <div
                    className="panel-body"
                    style={{
                      paddingBottom: "30px",
                      marginBottom: "20px",
                      marginTop: "40px",
                    }}
                  >
                    <div className="row">
                    <div
                        className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                        style={{ marginLeft: "50px", marginTop: "25px" }}
                      >
                        <div style={{ width: "300px", height: "300px" }}>
                          <input
                            type="file"
                            id="file"
                            className="custom-up-avatar"
                            onChange={this.onImageChange}
                          />
                          {this.state.setLoading ? (
                            <p>loading.........</p>
                          ) : (
                            <label htmlFor="file" className="labelforImp">
                              <div className="camera-hover">
                                <div className='div-i'>
                                  <i
                                    className="fas fa-camera fa-2x"
                                    style={{ color: "gray" }}
                                  ></i>
                                </div>

                                <img
                                  src={this.state.set}
                                  className="image-import"
                                  alt={this.state.set}
                                />
                              </div>
                            </label>
                          )}
                        </div>
                      </div>
                      {/* 0 : Phone , NAME */}
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
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Full Name
                              </span>
                              <span>
                                <input
                                  type="text"
                                  name="CandName"
                                  id="input"
                                  className="form-control ml-10"
                                  style={{ width: "200px", height: "25px" }}
                                  value={this.state.CandName}
                                  disabled={true}
                                />
                              </span>
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Phone
                              </span>
                              <input
                                type="text"
                                name="CandPhone"
                                id="input"
                                className="form-control ml-10"
                                style={{ width: "200px", height: "25px" }}
                                value={this.state.CandPhone}
                                disabled={true}
                              />
                            </div>
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
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Address
                              </span>
                              <input
                                type="text"
                                name="CandAddress"
                                id="input"
                                className="form-control ml-10"
                                style={{ width: "200px", height: "25px" }}
                                value={this.state.CandAddress}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Email
                              </span>
                              <input
                                type="text"
                                name="Email"
                                id="input"
                                className="form-control ml-10"
                                style={{ width: "200px", height: "25px" }}
                                value={this.state.Email}
                                disabled={true}
                              />
                            </div>
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
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Date Of Birth
                              </span>
                              <input
                                type="text"
                                name="CandBirthday"
                                id="input"
                                className="form-control ml-10"
                                style={{ width: "200px", height: "25px" }}
                                // onChange={this.onChange}
                                value={moment(this.state.CandBirthday).format(
                                  "DD/MM/YYYY"
                                )}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Gender
                              </span>
                              <label className="ml-10">
                                <input
                                  type="radio"
                                  value={this.state.CandGender}
                                  // onChange={this.onChange}
                                  checked={this.state.CandGender === 1}
                                  disabled={true}
                                  name="CandGender"
                                />
                                MALE
                              </label>
                              <label className="ml-50">
                                <input
                                  type="radio"
                                  value={this.state.CandGender}
                                  // onChange={this.onChange}
                                  checked={this.state.CandGender === 2}
                                  disabled={true}
                                  name="CandGender"
                                />
                                FEMALE
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 : MAJOR, LINK */}
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
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Major
                              </span>
                              <input
                                type="text"
                                name="CandMajor"
                                id="input"
                                className="form-control ml-10"
                                style={{ width: "200px", height: "25px" }}
                                // onChange={this.onChange}
                                value={this.state.CandMajor}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div
                            className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                            style={{ marginTop: "20px" }}
                          >
                            <div className="row">
                              <span
                                className="label"
                                style={{ width: "120px" }}
                              >
                                Online CV Link
                              </span>
                              <input
                                type="text"
                                name="Link"
                                className="form-control ml-10"
                                style={{ width: "200px", height: "25px" }}
                                onChange={this.onChange}
                                value={this.state.Link}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>   </div>
            </div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "40px",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                className="btn_accept"
                onClick={() => {
                  if (this.state.Link === '') {
                    this.modalError();
                  } else this.clickModal();
                }}
              >
                OK
            </button>

              <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                isOpen={this.state.addModalshow}
              >
                <ModalBody>
                  <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Would you like to Import this CV?</p>
                  <div className="form-row" style={{ textAlign: 'center' }}>

                    <div className="form-group col-md-12">
                      <Button className="btn_OK" onClick={() => this.upLoad()}disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                      <Button onClick={() => this.onHide()} className="btn_cancel">Cancel</Button>
                    </div>
                  </div>
                </ModalBody>
              </Modal>


              <button
                type="submit"
                className="btn_reject"
                onClick={() => this.ModalBack()}
              >
                Cancel
            </button>
            </div>
          </div>

        </div>
        <Footer />
        <ModalError
          isOpen={this.state.modalError}
          onhide={modalErrorClose}
        />
        <ModalBack
          isOpen={this.state.modalBack}
          onhide={modalBackClose} />
        <ToastContainer />
      </div>
    );

  }
}

export default ImportCV;
