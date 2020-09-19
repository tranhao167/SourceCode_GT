import React, { Component } from "react";
import Axios from "axios";
import TopMenuSigned from '../../MainPage/TopMenuSigned';
import Footer from '../../MainPage/Footer';
import EducationChild from "./EducationChild";
import WorkExperienceChild from "./WorkExperienceChild";
import SkillChild from "./SkillChild";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import { Modal, ModalBody, Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Modalerror from "../Modal/Modalerror";
import ModalBack from "../Modal/ModalBack";


const qs = require("qs");
class CV extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
      this.state = { loggedIn }
    } else this.state = {
      set: null,
      selectedfile: null,
      loading: false,
      setImage: "",
      setLoading: false,
      url: "",
      modalError: false, modalBack: false,
      addModalshow: false, array: {}, test: false,
      doneback: false,
      addModal: false,
      Objective: "",
      Interest: "",
      CandID: '',
      Link: '',
      CandName: '',
      CandPhone: '',
      Email: '',
      CandGender: '',
      CandAddress: '',
      CandBirthday: '',
      CandMajor: '',
      AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
      educhild: [
        {
          Startday: "",
          Endday: "",
          School: "",
          GPA: "",
          Major: "",
          LevelEdu: "",
          CandID: ""
        }
      ],
      skillchild: [
        {
          SkillName: "",
          TypeSkill: "",
          CandID: ""
        }
      ],
      wechild: [{
        WorkTime: "",
        WorkPlace: "",
        Position: "",
        CandID: ""
      }]
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
        CandGender: res.data.inf.CandGender===1?"Male":"Female",
        CandAddress: res.data.inf.CandAddress,
        CandBirthday: res.data.inf.CandBirthday,
        CandMajor: res.data.inf.CandMajor,
        Startday: res.data.inf.Startday,
        Image: res.data.inf.Image,
        UpdateNew: res.data.inf.UpdateNew,
        Link: res.data.inf.Link,
        Status: res.data.inf.Status
      })
    })
  }
  clickModal = (e) => {
    e.preventDefault();
    this.setState({
      addModalshow: true
    })

  }
  onHide = () => {
    this.setState({
      addModalshow: false
    })
  }

  //......................//
  handleChangeEdu = (index, field, value) => {
    var educhild = this.state.educhild;
    educhild = educhild.map((item) => {
      return { ...item, CandID: this.state.CandID }
    })
    educhild[index][field] = value;
    this.setState({
      educhild: educhild,

    });
  };
  handleChangeWE = (index, field, value) => {
    var wechild = this.state.wechild;
    wechild = wechild.map((item) => {
      return { ...item, CandID: this.state.CandID }
    })
    wechild[index][field] = value;

    this.setState({
      wechild: wechild,
    });


  };
  handleChangeSkill = (index, field, value) => {
    var skillchild = this.state.skillchild;
    skillchild = skillchild.map((item) => {
      return { ...item, CandID: this.state.CandID }
    })

    skillchild[index][field] = value;
    this.setState({
      skillchild: skillchild,
    });
  };

  addEdu = (index) => {
    this.setState({
      educhild: (this.state.educhild.slice(0, index + 1).concat([{}])).concat(this.state.educhild.slice(index + 1))
    })
  }
  delEdu = (index) => {
    if (this.state.educhild.length > 1) {
      this.setState({
        educhild: this.state.educhild.slice(0, index).concat(this.state.educhild.slice(index + 1))
      })
    }
  }

  addWE = (index) => {
    this.setState({
      wechild: (this.state.wechild.slice(0, index + 1).concat([{}])).concat(this.state.wechild.slice(index + 1))
    })
  }
  delWE = (index) => {
    if (this.state.wechild.length > 1) {
      this.setState({
        wechild: this.state.wechild.slice(0, index).concat(this.state.wechild.slice(index + 1))
      })
    }
  }
  addSkill = (index) => {
    this.setState({
      skillchild: (this.state.skillchild.slice(0, index + 1).concat([{}])).concat(this.state.skillchild.slice(index + 1))
    })
  }
  delSkill = (index) => {
    if (this.state.skillchild.length > 1) {
      this.setState({
        skillchild: this.state.skillchild.slice(0, index).concat(this.state.skillchild.slice(index + 1))
      })
    }
  }

  modalError = () => {
    this.setState({
      modalError: true
    })
  }

  onReset = () => {
    this.setState({
      modalBack: true
    })
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  notify = () => {
    toast.success("Created")
  }

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

  onSave = async () => {
    this.setState({
      loading: true
    })
    var { educhild, wechild, skillchild } = this.state;
    var {
      CandID,
      CandName,
      CandPhone,
      Email,
      CandGender,
      CandAddress,
      CandBirthday,
      CandMajor,
      AccName, Objective, Interest
    } = this.state;
    Axios.post(
      `http://localhost:56058/api/CandidateEducation`,
      educhild,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {

      }).catch(err => {
        toast.error(err)
      })
    ///////////////////
    Axios.post(
      `http://localhost:56058/api/CandidateSkills`,
      skillchild,
      {
        headers: {

          'Content-Type': 'application/json'
        }
      }).then(res => {
      }).catch(err => {
        toast.error(err)
      })
    ////////////////////
    Axios.post(
      `http://localhost:56058/api/CandidateWork`,
      wechild,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
          doneback: true,
        });

      })
      .catch(err => {
        alert(err);
      })
    Axios.post(
      `http://localhost:56058/api/CandidateInfo`,
      qs.stringify({
        Objective: Objective,
        Interest: Interest,
        CandID: CandID,
        CandName: CandName,
        CandPhone: CandPhone,
        Email: Email,
        Image: this.state.setImage,
        CandGender: CandGender === "Male" ? 1 : 2,
        CandAddress: CandAddress,
        CandBirthday: CandBirthday,
        CandMajor: CandMajor,
        AccName: AccName,

      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 100000)
        this.notify();
        this.setState({
          doneback: true
        })
      }).catch(err => {
        alert(err)
      })
  };


  render() {
    let modalErrorClose = () => { this.setState({ modalError: false }) }
    let modalBackClose = () => { this.setState({ modalBack: false }) }
    if (this.state.loggedIn === false) {
      return <Redirect to="/signin" />
    }
    if (this.state.doneback) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <TopMenuSigned />
        <div className="Employer_font">

          <div className="container" style={{ marginBottom: '5%' }}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form
                  onSubmit={this.clickModal}
                  className="bg-white"
                  style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', paddingBottom: '1%' }}
                >
                  <div className="form-group">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title-cv" style={{ marginTop: '2%', paddingTop: '2%' }}>CV</h3>
                      </div>
                      <hr></hr>
                      <div className="panel-body">
                        {/* Info */}
                        <div className="form-row">
                          <div
                            className="form-group col-md-4"
                            style={{ textAlign: "center" }}
                          >
                            <input
                              type="file"
                              id="file"
                              className="custom-up-avatar-create"
                              onChange={this.onImageChange}
                            />
                            {this.state.setLoading ? (
                              <p>loading.........</p>
                            ) : (
                              <label htmlFor="file" className="labelforfile-create">
                                <div className="camera-hover-create">
                                  <div className="div-i-create">
                                    <i
                                      className="fas fa-camera fa-2x"
                                      style={{ color: "gray" }}
                                    ></i>
                                  </div>

                                  <img
                                    src={this.state.set}
                                    className="image-import-create"
                                    alt={this.state.set}
                                  />
                                </div>
                              </label>
                            )}
                          </div>
                          <div className="form-group col-md-1"></div>
                          <div className="form-group col-md-7">
                            <h2>{this.state.CandName}</h2>
                            <div className="divtext">Major:<span className="boldtext">{this.state.CandMajor}</span> </div>
                        
                            <span className="divtext">Date of Birth:</span><Moment format="DD/MM/YYYY" className="boldtext">{this.state.CandBirthday}</Moment>
                            <div className="divtext">Gender: <span className="boldtext">{this.state.CandGender}</span></div>
                            <div className="divtext">Phone: <span className="boldtext">{this.state.CandPhone}</span></div>
                            <div className="divtext">Email: <span className="boldtext">{this.state.Email}</span></div>
                            <div className="divtext">Address: <span className="boldtext">{this.state.CandAddress}</span></div>
                          </div>
                        </div>

                        {/* Objective */}
                        <h3 className="tieude ml-30">Objective</h3>
                        <hr size="30px"></hr>
                        <div className="row">
                          <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11" style={{ marginLeft: '3%' }}>
                            <textarea
                              name="Objective"
                              id="input"
                              className="form-control"
                              rows="5"
                              cols="12"
                              data-tip="Enter objective when working for the company"
                              data-place="right"
                              data-type="info"
                              value={this.state.Objective}
                              onChange={this.onChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <br></br>
                        {/* Education */}
                        <h3 className="tieude ml-30">Education</h3>
                        <hr size="30px"></hr>
                        {/* ///////////////////////////////// */}

                        <div>
                          {this.state.educhild.map((educhild, index) => {
                            return (
                              <EducationChild
                                key={index}
                                index={index}
                                addEdu={this.addEdu}
                                delEdu={this.delEdu}
                                Startday={educhild.Startday}
                                GPA={educhild.GPA}
                                Endday={educhild.Endday}
                                School={educhild.School}
                                Major={educhild.Major}
                                LevelEdu={educhild.LevelEdu}
                                onChange={this.handleChangeEdu}
                              ></EducationChild>
                            );
                          })}

                        </div>
                        {/* <div>
                        
                      </div>
                      <br></br> */}
                        {/* Work Experience */}
                        <h3 className="tieude ml-30">Work Experience</h3>
                        <hr size="30px"></hr>
                        <div>
                          {this.state.wechild.map((wechild, index) => {
                            return (
                              <WorkExperienceChild
                                key={index}
                                index={index}
                                addWE={this.addWE}
                                delWE={this.delWE}
                                WorkPlace={wechild.WorkPlace}
                                WorkTime={wechild.WorkTime}
                                Position={wechild.Position}
                                onChange={this.handleChangeWE}
                              ></WorkExperienceChild>
                            );
                          })}
                        </div>
                        <br></br>
                        {/* Skills */}
                        <h3 className="tieude ml-30">Skills</h3>
                        <hr size="30px"></hr>
                        <div>
                          {this.state.skillchild.map((skillchild, index) => {
                            return (
                              <SkillChild
                                key={index}
                                index={index}
                                addSkill={this.addSkill}
                                delSkill={this.delSkill}
                                TypeSkill={skillchild.TypeSkill}
                                SkillName={skillchild.SkillName}
                                onChange={this.handleChangeSkill}
                              ></SkillChild>
                            );
                          })}
                        </div>
                        <br></br>
                        {/* Interest */}
                        <h3 className="tieude ml-30">Interest</h3>
                        <hr size="30px"></hr>
                        <div className="row">
                          <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11" style={{ marginLeft: '3%' }}>
                            <textarea
                              value={this.state.Interest}
                              onChange={this.onChange}
                              name="Interest"
                              data-tip="Enter your interests"
                              data-place="bottom"
                              data-type="info"
                              className="form-control"
                              rows="5"
                              cols="12"
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="btnsubcan">
                    <button
                      type="submit"
                      className="btn_accept"
                    >
                      Create
                  </button>
                    <Modal
                      {...this.props}
                      size="md"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      isOpen={this.state.addModalshow}
                    >
                      <ModalBody>
                        <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Would you like to create this CV?</p>
                        <div className="form-row" style={{ textAlign: 'center' }}>

                          <div className="form-group col-md-12">
                            <Button className="btn_OK" onClick={() => this.upLoad()} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                            <Button onClick={() => { this.setState({ addModalshow: false }) }} className="btn_cancel">Cancel</Button>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>

                    <button
                      type="reset"
                      id="btnCancel"
                      className="btn_reject"
                      onClick={this.onReset}
                    >
                      Cancel
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Modalerror
          isOpen={this.state.modalError}
          onhide={modalErrorClose}
        />
        <ModalBack
          isOpen={this.state.modalBack}
          onhide={modalBackClose} />
        <Footer />
        <ToastContainer /><ReactTooltip />
      </div>
    );
  }
}

export default CV;
