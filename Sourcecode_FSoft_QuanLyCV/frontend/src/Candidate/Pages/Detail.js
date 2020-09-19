import React, { Component } from 'react';
import Footer from '../../MainPage/Footer';
import TopmentSigned from '../../MainPage/TopMenuSigned'
import Moment from 'react-moment';
import Axios from 'axios';
import { Button, Modal, ModalBody } from 'reactstrap';
import EduUpdate from "./EduUpdate";
import WEUpdate from "./WEUpdate";
import SkillUpdate from "./SkillUpdate";
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
class Detail extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false;
      this.state = {
        CandName: "",
        Startday: "",
        Link: "",
        loggedIn,
      };
    } else
      this.state = {
        loggedIn, modal: false, loading: false, doneback: false,
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
        UpdateTimes: '',
        AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
        Status: '',
        UpdateNew: '',
        disabledUpdate: true,
        disabled: true,
        delmodal: false,
        HasRejected: '',
        ckc: [],
        We: [
          {
            WorkTime: "",
            WorkPlace: "",
            Position: "",
            CandID: "",
          },
        ],
        Edu: [
          {
            Startday: "",
            Endday: "",
            School: "",
            GPA: "",
            Major: "",
            LevelEdu: "",
            CandID: "",
            EduID: "",
          },
        ],
        skill: [
          {
            SkillName: "",
            TypeSkill: "",
            CandID: "",
            SkillID: "",
          },
        ],
        Objective: "",
        Interest: "",
        back: false,
        detail: false,
        Skills: null,
        Educations: null,
        WorkExperiences: null,
        edit: false,
        TypeSkill: "",
        SkillName: "",
      };
  }
  componentDidMount() {
    console.clear();
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
          Objective: res.data.inf.Objective,
          Interest: res.data.inf.Interest,
          CandGender: res.data.inf.CandGender === 1 ? "Male" : "Female",
          CandAddress: res.data.inf.CandAddress,
          CandBirthday: res.data.inf.CandBirthday,
          CandMajor: res.data.inf.CandMajor,
          Startday: res.data.inf.Startday,
          UpdateTimes: res.data.inf.UpdateTimes,
          Image: res.data.inf.Image,
          HasRejected: res.data.inf.HasRejected,
          UpdateNew: res.data.inf.UpdateNew,
          Link: res.data.inf.Link,
          Status: res.data.inf.Status
        })
        if (res.status === 200) {
          var { match } = this.props;
          if (match) {
            var CandID = this.state.CandID;
            Axios({
              method: "GET",
              url: `http://localhost:56058/api/CVnew/${CandID}`,
              data: null,
            }).then((res) => {
              // console.log(res.data);
              var data = res.data;
              this.setState({
                Skills: data.Skills,
                Educations: data.Educations,
                WorkExperiences: data.WorkExperiences,
              });
            });
            //Educations
            Axios({
              method: "GET",
              url: `http://localhost:56058/api/Educations/${CandID}`,
              data: null,
            }).then((res) => {
              var data = res.data;

              this.setState({
                CandID: data.CandID,
                Major: data.Major,
                School: data.School,
                LevelEdu: data.LevelEdu,
                Startday: data.Startday,
                Endday: data.Endday,
                GPA: data.GPA,
              });
            });
            Axios({
              method: "GET",
              url: `http://localhost:56058/api/WorkExperience/${CandID}`,
              data: null,
            }).then((res) => {
              var data = res.data;

              this.setState({
                Position: data.Position,
                WorkPlace: data.WorkPlace,
                WorkTime: data.WorkTime,
              });
            });
          }
        }
      })

  }
  handleChangeWE = (index, field, value) => {
    var WorkExperiences = this.state.WorkExperiences;
    var We = this.state.We;
    WorkExperiences = WorkExperiences.map((item) => {
      return {
        ...item,
        CandID: this.state.CandID,
      };
    });
    We = WorkExperiences.map((data) => {
      return {
        WorkPlace: data.WorkPlace,
        WorkTime: data.WorkTime,
        Position: data.Position,
        CandID: data.CandID,
        ExpID: data.ExpID,
      };
    });
    WorkExperiences[index][field] = value;
    We[index][field] = value;
    this.setState({
      WorkExperiences: WorkExperiences,
      We: We,
    });
  };

  handleChangeSkill = (index, field, value) => {
    var Skills = this.state.Skills;
    var skill = this.state.skill;
    Skills = Skills.map((item) => {
      return {
        ...item,
        CandID: this.state.CandID,
      };
    });
    skill = Skills.map((data) => {
      return {
        TypeSkill: data.TypeSkill,
        SkillName: data.SkillName,
        SkillID: data.SkillID,
        CandID: data.CandID,
      };
    });
    Skills[index][field] = value;
    skill[index][field] = value;
    this.setState({
      Skills: Skills,
      skill: skill,
    });
  };

  handleChangeEdu = (index, field, value) => {
    var Educations = this.state.Educations;
    var Edu = this.state.Edu;
    Educations = Educations.map((item) => {
      return {
        ...item,
        CandID: this.state.CandID,
      };
    });
    Edu = Educations.map((data) => {
      return {
        EduID: data.EduID,
        School: data.School,
        GPA: data.GPA,
        Major: data.Major,
        LevelEdu: data.LevelEdu,
        CandID: data.CandID,
        Startday: data.Startday,
        Endday: data.Endday,
      };
    });
    Educations[index][field] = value;
    Edu[index][field] = value;
    this.setState({
      Educations: Educations,
      Edu: Edu,
    });
  };
  openModal = (e) => {
    e.preventDefault();
    this.setState({
      edit: true, disabled: false
    })
    if (this.state.edit) {
      this.setState({
        modal: true
      })
    }
  }
  notify = () => {
    toast.success("Update Successfully!")
  }
  clickSAVE = () => {
    this.setState({
      loading: true
    })
    var { CandID, We, skill, Edu, Objective, Interest } = this.state;
    // Update Education
    Axios.post(
      `http://localhost:56058/api/CandidateUpdate`,

      // CandID: CandID,
      this.state.Educations, Edu,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => { })
      .catch((error) => {
        console.log(error.response);
      });
    // Update Objective, Interest
    Axios.post(
      `http://localhost:56058/api/CandidateUpdateInfo?id=${CandID}&objective=${Objective}&interest=${Interest}`,
      {
        id: CandID,
        objective: Objective,
        interest: Interest
      },
    ).then(res => { }
    ).catch(err => {
      console.log(err.response);
    })
    // Update Skills
    Axios.post(
      `http://localhost:56058/api/CandidateUpdateSkills`,

      // CandID: CandID,
      this.state.Skills, skill,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => { })
      .catch((error) => {
        console.log(error.response);
      });

    Axios.post(
      `http://localhost:56058/api/CandidateUpdateWork`,

      // CandID: CandID,
      this.state.WorkExperiences, We,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          this.notify();
          this.setState({
            doneback: true
          })
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

  };

  render() {
    if (this.state.doneback) {
      return <Redirect to="/cvmanagement" />
    }
    let check = null;
    if (this.state.Status !== "Rejected" || this.state.HasRejected === null) {
      check = (<Button className="btn_Edit_Notsignin" disabled={this.state.disabledUpdate}>EDIT</Button>);
    } else if (this.state.Status === "Rejected" && this.state.edit === false) {
      check = (<Button className="btn_Edit" type="submit">EDIT</Button>);
    } else if (this.state.edit) {
      check = (
        <Button type="submit" className="btn_accept">SAVE</Button>
      );
    }
    let Reject = null;
    if (this.state.Status === null && this.state.UpdateTimes === 0) {
      Reject = (<span className="boldtext">Wait For Approve</span>)
    } else if (this.state.Status === "Rejected" && this.state.UpdateTimes > 0 && this.state.HasRejected===null) {
      Reject = (<span className="boldtext">Updated. Wait For Approve</span>)
    } else if (this.state.UpdateTimes > 0  &&this.state.HasRejected==="Yes") {
      Reject = (<span className="boldtext">{this.state.Status}(Rejected with {this.state.UpdateTimes} times)</span>)
    } else if (this.state.Status === "Approved") {
      Reject = (<span className="boldtext">{this.state.Status}</span>)
    } else if (this.state.Status === "Rejected" && this.state.UpdateTimes === 0) {
      Reject = (<span className="boldtext">{this.state.Status}</span>)
    }
    let Skills;
    if (this.state.Skills !== null) {
      Skills = this.state.Skills.map((Skill, index) => (
        <div key={index}>
          <SkillUpdate
            key={index}
            index={index}
            SkillID={index}
            TypeSkill={Skill.TypeSkill}
            SkillName={Skill.SkillName}
            disabled={this.state.disabled}
            onChange={this.handleChangeSkill}
          />
        </div>


      ));
    }

    let Educations;
    if (this.state.Educations !== null) {
      Educations = this.state.Educations.map((edu, index) => {
        return (
          <div key={index}>
            <hr></hr>
            <div>
              <EduUpdate
                key={index}
                index={index}
                EduID={index}
                Startday={
                  (edu.Startday =
                    new Date(edu.Startday).getFullYear() +
                    "-" +
                    (new Date(edu.Startday).getMonth() >= 9
                      ? new Date(edu.Startday).getMonth()
                      : "0" + (new Date(edu.Startday).getMonth() + 1)) +
                    "-" +
                    (new Date(edu.Startday).getDate() > 9
                      ? new Date(edu.Startday).getDate()
                      : "0" + new Date(edu.Startday).getDate()))
                }
                GPA={edu.GPA}
                Endday={
                  (edu.Endday =
                    new Date(edu.Endday).getFullYear() +
                    "-" +
                    (new Date(edu.Endday).getMonth() >= 9
                      ? new Date(edu.Endday).getMonth()
                      : "0" + (new Date(edu.Endday).getMonth() + 1)) +
                    "-" +
                    (new Date(edu.Endday).getDate() > 9
                      ? new Date(edu.Endday).getDate()
                      : "0" + new Date(edu.Endday).getDate()))
                }
                School={edu.School}
                Major={edu.Major}
                LevelEdu={edu.LevelEdu}
                disabled={this.state.disabled}
                onChange={this.handleChangeEdu}
              ></EduUpdate>
            </div>
          </div>
        );
      });
    }

    let WorkExperiences;
    if (this.state.WorkExperiences !== null) {
      WorkExperiences = this.state.WorkExperiences.map(
        (WorkExperience, index) => (
          <div key={index}>
            <hr></hr>
            <WEUpdate
              key={index}
              index={index}
              ExpID={index}
              WorkTime={WorkExperience.WorkTime}
              WorkPlace={WorkExperience.WorkPlace}
              Position={WorkExperience.Position}
              disabled={this.state.disabled}
              onChange={this.handleChangeWE}
            ></WEUpdate>
          </div>
        )
      );
    }

    return (
      <div>
        <TopmentSigned />
        <div className="Changepass_font">
          <form style={{ width: "100%" }}
            onSubmit={this.openModal}>
            <div className="form-row">
              <div
                className="form-group col-md-7"
                style={{
                  borderRadius: "10px",
                  border: "0",
                  boxShadow: "5px 10px 18px #888888",
                  marginLeft: "1%",
                }}
              >
                <div className="bg-white">
                  <legend style={{ textAlign: "center" }}>
                    <h2>CV</h2>
                  </legend>
                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                  {/* Personal information */}
                  <div className="form-row">
                    <div className="form-group col-md-4"><img src={this.state.Image} alt={this.state.Image} style={{ marginLeft: '5%', width: '200px', height: '200px' }} /></div>
                    <div className="form-group col-md-1"></div>
                    <div className="form-group col-md-7">
                      <h2>{this.state.CandName}</h2>
                      <div className="divtext">
                        Major:{" "}
                        <span className="boldtext">{this.state.CandMajor}</span>
                      </div>
                      <br />
                      <span className="divtext">Date of Birth:</span>
                      <Moment format="DD/MM/YYYY" className="boldtext">
                        {this.state.CandBirthday}
                      </Moment>
                      <div className="divtext">
                        Gender:
                        <span className="boldtext">
                          {this.state.CandGender}
                        </span>
                      </div>
                      <div className="divtext">
                        Phone:{" "}
                        <span className="boldtext">{this.state.CandPhone}</span>
                      </div>
                      <div className="divtext">
                        Email:{" "}
                        <span className="boldtext">{this.state.Email}</span>
                      </div>
                      <div className="divtext">
                        Address:{" "}
                        <span className="boldtext">
                          {this.state.CandAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                  {/* Objective */}

                  <div className="form-group">
                    <label>
                      <h2>Objective</h2>
                    </label>
                    <div style={{ fontSize: "17px" }}>
                      <textarea
                        rows="5"
                        style={{ width: '100%' }}
                        className="boldtext"
                        type="text"
                        disabled={this.state.disabled}
                        onChange={(e) => {
                          this.setState({
                            Objective: e.target.value,
                          });
                        }}

                        value={this.state.Objective}
                      />
                    </div>
                  </div>

                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                  {/* Educations */}
                  <label>
                    {" "}
                    <h2>Educations</h2>
                  </label>
                  {Educations}
                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                  {/* Work Experience */}
                  <label>
                    <h2> Work Experience</h2>
                  </label>
                  {WorkExperiences}
                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                  {/* Skills */}
                  <label>
                    <h2> Skills</h2>
                  </label>
                  {Skills}
                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                  {/* Interest */}

                  <div className="form-group">
                    <label>
                      <h2>Interest</h2>
                    </label>
                    <div style={{ fontSize: "17px", marginLeft: "5px" }}>
                      <textarea
                        rows="2"
                        style={{ width: '100%' }}
                        className="boldtext"
                        type="text"
                        disabled={this.state.disabled}
                        onChange={(e) => {
                          this.setState({
                            Interest: e.target.value,
                          });
                        }}
                        value={this.state.Interest}
                      />
                    </div>
                  </div>
                  <hr style={{ width: "100%", backgroundColor: "black" }} />
                </div>
              </div>
              <div className="form-group col-md-4" style={{ marginLeft: "1%" }}>
                <h2>ACCOUNT INFORMATION</h2>
                <div style={{ textAlign: "left" }}>
                  <div className="divtext">
                    Name:{" "}
                    <span className="boldtext">{this.state.CandName}</span>
                  </div>
                  <span className="divtext">Date of Birth:</span>
                  <Moment format="DD/MM/YYYY" className="boldtext">
                    {this.state.CandBirthday}
                  </Moment>
                  <div className="divtext">
                    Gender:{" "}
                    <span className="boldtext">{this.state.CandGender}</span>
                  </div>
                  <div className="divtext">
                    Phone:{" "}
                    <span className="boldtext">{this.state.CandPhone}</span>
                  </div>
                  <div className="divtext">
                    Email: <span className="boldtext">{this.state.Email}</span>
                  </div>
                  <div className="divtext">
                    Address:{" "}
                    <span className="boldtext">{this.state.CandAddress}</span>
                  </div>
                  <div className="divtext">
                    Account:{" "}
                    <span className="boldtext">{this.state.AccName}</span>
                  </div>
                </div>
                <hr style={{ width: "100%" }}></hr>
                <div className="divtext">
                  Status: {Reject}
                </div>
              </div>
            </div>
            <div
              className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
              style={{ textAlign: "center" }}
            >
              {check}

              <Button
                type="button"
                className="btn_reject"
                onClick={() => this.props.history.push("/cvmanagement")}
              >
                BACK
              </Button>
            </div>

            <div style={{ marginTop: "5%" }}></div>
            <ToastContainer />
          </form>
          {/* Button */}
        </div>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.modal}
        >
          <ModalBody>
            <form>
              <div className="form-group">
                <p className="boldtext" style={{ textAlign: 'center' }}>Would you like to Update this CV?</p>
              </div>
              <div className="col-sm-12" style={{ textAlign: 'center' }}>
                <Button className="btn_OK" onClick={() => this.clickSAVE()} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                <Button onClick={() => this.setState({
                  modal: false
                })} className="btn_cancel">Cancel</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <Footer />

      </div>
    );
  }
}

export default Detail;
