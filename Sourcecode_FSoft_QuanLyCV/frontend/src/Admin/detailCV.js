import React, { Component } from 'react';
import Axios from 'axios';
import Moment from 'react-moment';
import Menuadmin from './Menuadmin';
import { Redirect } from 'react-router-dom';
import { Modal, ModalBody, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

class detailCV extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            Image: null,
            CandID: null,
            CandName: null,
            CandPhone: null,
            Email: null,
            CandGender: null,
            CandAddress: null,
            CandBirthday: null,
            Objective: null,
            Status: null,
            AccName: null,
            Interest: null,
            CandMajor: null,
            HasRejected: null,
            UpdateTimes: '',
            UpdateNew: '',
            //Eduction
            Educations: null,
            Major: null,
            School: null,
            LevelEdu: null,
            Startday: null,
            Endday: null,
            GPA: null,
            //Skill
            Skills: null,
            SkillID: null,
            TypeSkill: null,
            SkillName: null,
            //Work Experience
            WorkExperiences: null,
            Position: null,
            WorkPlace: null,
            WorkTime: null,
            addmodalshow: false, loading: false, ckc: [], back: false
        }
    }
    showModalcreate = (e) => {
        e.preventDefault();
        this.setState({
            addmodalshow: true
        })
    }
    hide = () => {
        this.setState({
            addmodalshow: false
        })
    }
    onBack = () => {
        this.props.history.push("/admin/cv");
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var CandID = match.params.id;
            Axios({
                method: 'GET',
                url: `http://localhost:56058/api/CVnew/${CandID}`,
                data: null
            }).then(res => {
                var data = res.data;

                this.setState({
                    CandID: data.CandID,
                    CandName: data.CandName,
                    CandPhone: data.CandPhone,
                    Email: data.Email,
                    CandGender: data.CandGender === 1 ? 'Male' : 'Female',
                    CandAddress: data.CandAddress,
                    CandBirthday: data.CandBirthday,
                    CandMajor: data.CandMajor,
                    Objective: data.Objective,
                    AccName: data.AccName,
                    Image: data.Image,
                    Status: data.Status,
                    Interest: data.Interest,
                    UpdateTimes: data.UpdateTimes,
                    UpdateNew: data.UpdateNew, HasRejected: data.HasRejected,
                    Skills: data.Skills,
                    Educations: data.Educations,
                    WorkExperiences: data.WorkExperiences
                });
            }
            );
            //Educations
            Axios({
                method: 'GET',
                url: `http://localhost:56058/api/Educations/${CandID}`,
                data: null
            }).then(res => {
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
            }
            );
            //Work Experience
            Axios({
                method: 'GET',
                url: `http://localhost:56058/api/WorkExperience/${CandID}`,
                data: null
            }).then(res => {
                var data = res.data;

                this.setState({
                    Position: data.Position,
                    WorkPlace: data.WorkPlace,
                    WorkTime: data.WorkTime
                });
            }
            );
        }
    }
    render() {
        let Reject = null;
        if (this.state.Status === null && this.state.UpdateTimes === 0) {
            Reject = (<span className="boldtext">Wait For Approve</span>)
        } else if (this.state.Status === "Rejected" && this.state.UpdateTimes > 0 && this.state.HasRejected === null) {
            Reject = (<span className="boldtext">Updated. Wait For Approve</span>)
        } else if (this.state.UpdateTimes > 0 && this.state.HasRejected === "Yes") {
            Reject = (<span className="boldtext">{this.state.Status}(Rejected with {this.state.UpdateTimes} times)</span>)
        } else if (this.state.Status === "Approved") {
            Reject = (<span className="boldtext">{this.state.Status}</span>)
        } else if (this.state.Status === "Rejected" && this.state.UpdateTimes === 0) {
            Reject = (<span className="boldtext">{this.state.Status}</span>)
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin/login" />
        }
        let Skills;
        if (this.state.Skills !== null) {
            Skills = this.state.Skills.map(Skill => (
                <div>
                    <div className="form-row">
                        <div className="form-group col-md-5" style={{ marginLeft: '1%' }}>
                            <div className="divtext">Type of Skill: <span className="boldtext">{Skill.TypeSkill}</span></div>
                        </div>
                        <div className="form-group col-md-1"></div>
                        <div className="form-group col-md-5">
                            <div className="divtext">Skill Name: <span className="boldtext">{Skill.SkillName}</span></div>
                        </div>
                    </div>
                </div>
            ));
        }

        let Educations;
        if (this.state.Educations !== null) {
            Educations = this.state.Educations.map(Education => (
                <div>
                    <hr></hr>
                    <div className="form-row">
                        <div className="form-group col-md-5" style={{ marginLeft: '1%' }}>
                            <div style={{ fontSize: '17px' }}><Moment format="DD/MM/YYYY" className="boldtext">{Education.Startday}</Moment> To <Moment format="DD/MM/YYYY" className="boldtext">{Education.Endday}</Moment></div>
                        </div>
                        <div className="form-group col-md-1"></div>
                        <div className="form-group col-md-5">
                            <div className="divtext">School: <span className="boldtext">{Education.School}</span></div>
                            <div className="divtext">Level: <span className="boldtext">{Education.LevelEdu}</span></div>
                            <div className="divtext">Major: <span className="boldtext">{Education.Major}</span></div>
                            <div className="divtext">GPA: <span className="boldtext">{Education.GPA}</span></div>
                        </div>
                    </div>
                </div>
            ));
        }

        let WorkExperiences;
        if (this.state.WorkExperiences !== null) {
            WorkExperiences = this.state.WorkExperiences.map(WorkExperience => (
                <div>
                    <hr></hr>
                    <div>
                        <div className="form-row" style={{ marginLeft: '1px' }}>
                            <div className="form-group col-md-6">
                                <div className="divtext">Work Time: <span className="boldtext">{WorkExperience.WorkTime}</span></div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="divtext">Work Place: <span className="boldtext">{WorkExperience.WorkPlace}</span></div>
                            </div>
                        </div>
                        <div className="form-row" style={{ marginLeft: '1px' }}>
                            <div className="form-group col-md-6"></div>
                            <div className="form-group col-md-6">
                                <div className="divtext">Position: <span className="boldtext">{WorkExperience.Position}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
        return (
            <div>
                <Menuadmin />
                <form onSubmit={this.showModalcreate} style={{ width: '100%', marginTop: '5%' }} >
                    <div className="form-row">
                        <div className="form-group col-md-7" style={{ border: '1px solid black', marginLeft: '1%' }}>

                            <div className="bg-white">
                                <legend style={{ textAlign: 'center' }}><h2>CV</h2></legend>
                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                {/* Personal information */}
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <img src={this.state.Image} alt={this.state.Image} style={{ marginLeft: '5%', width: '200px', height: '200px' }} />
                                    </div>
                                    <div className="form-group col-md-1"></div>
                                    <div className="form-group col-md-7">
                                        <h2>{this.state.CandName}</h2>
                                        <div className="divtext">Major: <span className="boldtext">{this.state.CandMajor}</span></div>
                                        <br />
                                        <span className="divtext">Date of Birth:</span><Moment format="YYYY/MM/DD" className="boldtext">{this.state.CandBirthday}</Moment>
                                        <div className="divtext">Gender:<span className="boldtext">{this.state.CandGender}</span></div>
                                        <div className="divtext">Phone: <span className="boldtext">{this.state.CandPhone}</span></div>
                                        <div className="divtext">Email: <span className="boldtext">{this.state.Email}</span></div>
                                        <div className="divtext">Address: <span className="boldtext">{this.state.CandAddress}</span></div>
                                    </div>
                                </div>
                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                {/* Objective */}

                                <div className="form-group">
                                    <label><h2>Objective</h2></label>
                                    <div style={{ fontSize: '17px', marginLeft: '5px' }}>{this.state.Objective}</div>
                                </div>

                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                {/* Educations */}
                                <label> <h2>Educations</h2></label>
                                {Educations}
                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                {/* Work Experience */}
                                <label><h2> Work Experience</h2></label>
                                {WorkExperiences}
                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                {/* Skill */}
                                <label><h2> Skills</h2></label>
                                {Skills}
                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                {/* Interest */}

                                <div className="form-group">
                                    <label ><h2>Interest</h2></label>
                                    <div style={{ fontSize: '17px', marginLeft: '5px' }}>{this.state.Interest}</div>
                                </div>
                                <hr style={{ width: '100%', backgroundColor: 'black' }} />
                            </div>

                        </div>
                        <div className="form-group col-md-4" style={{ marginLeft: '1%' }} >
                            <h2>ACCOUNT INFORMATION</h2>
                            <div style={{ textAlign: 'left' }}>
                                <div className="divtext">Name: <span className="boldtext">{this.state.CandName}</span></div>
                                <span className="divtext">Date of Birth:</span><Moment format="YYYY/MM/DD" className="boldtext">{this.state.CandBirthday}</Moment>
                                <div className="divtext">Gender: <span className="boldtext">{this.state.CandGender}</span></div>
                                <div className="divtext">Phone: <span className="boldtext">{this.state.CandPhone}</span></div>
                                <div className="divtext">Email: <span className="boldtext">{this.state.Email}</span></div>
                                <div className="divtext">Address: <span className="boldtext">{this.state.CandAddress}</span></div>
                                <div className="divtext">Account: <span className="boldtext">{this.state.AccName}</span></div>
                            </div>
                            <hr style={{ width: '100%' }}></hr>
                            <div className="divtext">Status: <span style={{ fontWeight: 'bold' }}>{Reject}</span></div>
                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%', marginBottom: '3%' }}>
                        <button type="button" onClick={this.onBack} className="btn_reset">BACK</button>
                    </div>
                </form>
                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    isOpen={this.state.addmodalshow}
                >
                    <ModalBody>
                        <form >

                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Would you like to delete this CV?</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.onDelMulti()} className="btn_Del" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.hide()} className="btn_cancel">Cancel</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <ToastContainer />
            </div>
        );
    }
}

export default detailCV;
