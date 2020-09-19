import React, { Component } from 'react';
import Moment from 'react-moment';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import MenuEmp from './MenuEmp';
import { Button } from 'reactstrap';
import SendmailModal from './SendMail/SendmailModal';
import Footer from '../MainPage/Footer';
import RejectafterUpdate from './SendMail/RejectafterUpdate';
import RejectModal from './SendMail/RejectModal';

class EmpDetailRej extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt-acc");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            CandID: null,
            CandName: null,
            CandPhone: null,
            Email: null,
            CandGender: null,
            CandAddress: null,
            CandBirthday: null,
            Objective: null,
            CandMajor: null,
            Link: null,
            AccName: null,
            Interest: null,
            UpdateNew: '',
            Status: '', UpdateTimes: '', HasRejected: '',
            //Eduction
            Educations: null,
            Major: null,
            School: null,
            LevelEdu: null,
            Startday: null,
            Endday: null,
            GPA: null,
            Image: '',
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

            addModalshow: false,
            rejectModalshow: false,
            update: null
        }
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
                    AccName: data.AccName,
                    Interest: data.Interest,
                    Objective: data.Objective,
                    Status: data.Status,
                    CandMajor: data.CandMajor,
                    Link: data.Link,
                    HasRejected: data.HasRejected,
                    Image: data.Image,
                    UpdateTimes: data.UpdateTimes,
                    UpdateNew:data.UpdateNew,
                    Skills: data.Skills, Educations: data.Educations, WorkExperiences: data.WorkExperiences
                });
            }
            );   
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickModal = () => {
        this.setState({
            addModalshow: true
        })

    }
    rejectModal = () => {
        this.setState({
            rejectModalshow: true
        })
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/signin" />
        }
        let checkday=null;
        if(this.state.UpdateNew!==null){
            checkday=(<Moment format="DD/MM/YYYY" className="boldtext">{this.state.UpdateNew}</Moment>)
        }else checkday=(<span className="boldtext">Not Updated</span>)

        let addModalClose = () => this.setState({ addModalshow: false });
        let rejectModalClose = () => this.setState({ rejectModalshow: false });

        let checkbtnaccept = null, checkbtnrej = null;
        if (this.state.HasRejected === "Yes") {
            checkbtnaccept = (<Button className="btn_accept" disabled={true}>APPROVE</Button>);
            checkbtnrej = (<Button type="button" className="btn_reject" disabled={true}>REJECT</Button>)
        } else {
            checkbtnaccept = (<Button className="btn_accept" onClick={() => this.clickModal()}>APPROVE</Button>);
            checkbtnrej = (<Button type="button" className="btn_reject" onClick={() => this.rejectModal()}>REJECT</Button>)
        }

        let Reject = null;
        if (this.state.UpdateTimes > 0 && this.state.HasRejected === null) {
            Reject = (<span className="boldtext">This CV has updated CV({this.state.UpdateTimes} time(s))</span>)
        }
        else if (this.state.UpdateTimes === 0) {
            Reject = (<span className="boldtext">{this.state.Status}</span>)
        }
        else if (this.state.HasRejected === "Yes") {
            Reject = (<span className="boldtext">{this.state.Status}. This CV has updated {this.state.UpdateTimes} time(s)</span>)
        }

        let Skills;
        if (this.state.Skills !== null) {
            Skills = this.state.Skills.map(Skill => (
                <div key={Skill.SkillID}>
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
                <div key={Education.EduID}>
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
                <div key={WorkExperience.ExpID}>
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

        if (this.state.Link !== null) {
            return (
                <div>

                    <div className="Employer_font">
                        <MenuEmp />
                        <div className="container" style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', marginBottom: '3%', marginTop: '3%' }}>
                            <div style={{ textAlign: 'center' }}><h2>CV</h2></div>
                            <div style={{ textAlign: 'center' }}>
                                <img style={{ justifyContent: 'center', width: '200px', height: '200px', marginBottom: '2%' }} alt="" src={this.state.Image} />
                            </div>
                            <form style={{ justifyContent: 'centered' }}>
                                <div className="form-row" style={{ justifyContent: 'center' }}>
                                    <div className="form-group col-md-6">
                                        <label className="divtext">Full Name:</label> <span className="divtext">{this.state.CandName}</span>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label className="divtext">Phone:</label> <span className="divtext">{this.state.CandPhone}</span>
                                    </div>
                                </div>
                                <div className="form-row" style={{ justifyContent: 'center' }}>
                                    <div className="form-group col-md-6">
                                        <label className="divtext">Address:</label> <span className="divtext">{this.state.CandAddress}</span>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label className="divtext">Email:</label> <span className="divtext">{this.state.Email}</span>
                                    </div>
                                </div>
                                <div className="form-row" style={{ justifyContent: 'center' }}>
                                    <div className="form-group col-md-6">
                                        <label className="divtext">Date of Birth:</label><Moment format="DD/MM/YYYY" className="divtext"><span >{this.state.CandBirthday}</span></Moment>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label className="divtext">Gender:</label> <span className="divtext">{this.state.CandGender}</span>
                                    </div>
                                </div>
                                <div className="form-row" style={{ justifyContent: 'center' }}>
                                    <div className="form-group col-md-6">
                                        <label className="divtext">Major:</label> <span className="divtext">{this.state.CandMajor}</span>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label className="divtext">Link:</label> <input className="divtext" type="text" disabled="true"

                                            value={this.state.Link} />
                                    </div>
                                </div>
                                <div className="form-row" style={{ justifyContent: 'center' }}>
                                    <div className="form-group col-md-6">
                                        <label className="divtext">Status:</label> <span className="boldtext">{Reject}</span>
                                    </div>
                                    <div className="form-group col-md-5">
                                    <label className="divtext">Last updated date:</label>{checkday}
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center' }}>
                            {checkbtnaccept}

                            {checkbtnrej}
                        </div>
                        <SendmailModal
                            isOpen={this.state.addModalshow}
                            onHide={addModalClose}
                            Email={this.state.Email}
                        />

                        <RejectafterUpdate
                            isOpen={this.state.rejectModalshow}
                            onHide={rejectModalClose}
                            email={this.state.Email}

                        />
                        <div style={{ marginTop: '5%' }}></div>

                    </div>
                    <Footer />
                </div>
            );
        } else if (this.state.Link === null) {
            return (
                <div>
                <div className="Employer_font">
                    <MenuEmp />
                    <form style={{ width: '100%', marginTop: '5%' }}>
                        <div className="form-row">
                            <div className="form-group col-md-7" style={{ border: '1px solid black', marginLeft: '1%' }}>

                                <div className="bg-white">
                                    <legend style={{ textAlign: 'center' }}><h2>CV</h2></legend>
                                    <hr style={{ width: '100%', backgroundColor: 'black' }} />
                                    {/* Personal information */}
                                    <div className="form-row">
                                        <div className="form-group col-md-4"><img src={this.state.Image} alt={this.state.Image} style={{ marginLeft: '5%', width: '200px', height: '200px' }} /></div>
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
                                    <span className="divtext">Date of Birth:</span><Moment format="MM/DD/YYYY" className="boldtext">{this.state.CandBirthday}</Moment>
                                    <div className="divtext">Gender: <span className="boldtext">{this.state.CandGender}</span></div>
                                    <div className="divtext">Phone: <span className="boldtext">{this.state.CandPhone}</span></div>
                                    <div className="divtext">Email: <span className="boldtext">{this.state.Email}</span></div>
                                    <div className="divtext">Address: <span className="boldtext">{this.state.CandAddress}</span></div>
                                    <div className="divtext">Account: <span className="boldtext">{this.state.AccName}</span></div>
                                </div>
                                <hr style={{ width: '100%' }}></hr>
                                <div className="divtext">Status: <span className="boldtext">{Reject}</span></div>
                                <div className="divtext">Last updated date: {checkday}</div>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center' }}>
                            {checkbtnaccept}
                            {checkbtnrej}
                            <div className="divtext">*Accept to Interview</div>
                            <SendmailModal
                                isOpen={this.state.addModalshow}
                                onHide={addModalClose}
                                Email={this.state.Email}
                            />

                            <RejectModal
                                isOpen={this.state.rejectModalshow}
                                onHide={rejectModalClose}
                                email={this.state.Email}

                            />
                        </div>
                        <div style={{ marginTop: '5%' }}></div>
                    </form>
                    {/* Button */}

                </div>
                    <Footer />
                </div>
            );
        }

    }
}

export default EmpDetailRej;
