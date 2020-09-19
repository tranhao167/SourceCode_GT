import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import Footer from '../../MainPage/Footer';
import { Redirect } from 'react-router-dom';
import TopMenuSigned from '../../MainPage/TopMenuSigned';
import Axios from 'axios';
import { toast } from 'react-toastify';
import Moment from 'react-moment';

class DetailImport extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt-cand-token");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
            this.state = {
                CandName: '',
                Startday: '',
                Link: '',
                loggedIn,

            }
        } else

            this.state = {
                loggedIn,
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
                UpdateTimes:'',
                UpdateNew:'',
                Image: '',
                AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
                Status: '',
                delmodal: false, ckc: [], back: false, detail: false,
                Skills: null, Educations: null, WorkExperiences: null, disabled: true, disabledUpdate: true,
                edit: false, modalSave: false, error: false, loading: false
            }
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
                Objective: res.data.inf.Objective,
                Interest: res.data.inf.Interest,
                CandGender: res.data.inf.CandGender === 1 ? "Male" : "Female",
                CandAddress: res.data.inf.CandAddress,
                CandBirthday: res.data.inf.CandBirthday,
                CandMajor: res.data.inf.CandMajor,
                Startday: res.data.inf.Startday,
                UpdateTimes: res.data.inf.UpdateTimes,
                Image: res.data.inf.Image,
                HasRejected:res.data.inf.HasRejected,
                UpdateNew: res.data.inf.UpdateNew,
                Link: res.data.inf.Link,
                Status: res.data.inf.Status
            })
        })
    }
    click = () => {
        console.clear();
        this.setState({
            edit: true,
            disabled: false
        })

    }
    clickSAVE = () => {
        this.setState({
            modalSave: true
        })

    }

    hide = () => {
        this.setState({
            modalSave: false
        })
    }
    hideERR = () => {
        this.setState({
            modalSave: false,
            error: false
        })
    }
    
    showErr = () => {
        this.setState({
            error: true
        })
    }
    onSave = () => {
        this.setState({
            loading: true
        })
        Axios({
            method: 'PUT',
            url: `http://localhost:56058/api/CandidateImport?id=${this.state.CandID}&link=${this.state.Link}&times=${this.state.UpdateTimes}`,
            data: {
                id: this.state.CandID,
                link: this.state.Link,
                times:this.state.UpdateTimes
            }

        }).then(res => {
            toast.success("Changed!")
            this.setState({
                back: true,
            })
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 100000)
        }).catch(err => {
            this.setState({
                loading: false
            })
            this.showErr();
        })
    }

    render() {

        let check = null;
        if (this.state.Status === "Rejected" && this.state.HasRejected==="Yes") {
            check = (<Button className="btn_Edit" onClick={() => this.click()}>EDIT </Button>)
        } else if (this.state.Status === null || this.state.HasRejected!=="Yes") {
            check = (<Button className="btn_Edit_Notsignin" disabled={this.state.disabledUpdate}>EDIT </Button>)
        }
        if (this.state.edit) {
            check = (<Button className="btn_accept" onClick={() => this.clickSAVE()}>SAVE </Button>)
        }
        if (this.state.back) {
            return <Redirect to="/cvmanagement" />
        }
        let Reject = null;
        if (this.state.Status === null && this.state.UpdateTimes === 0) {
            Reject = (<span className="boldtext">Wait For Approve</span>)
        }else if(this.state.Status==="Rejected" && this.state.UpdateTimes>0 && this.state.HasRejected===null){
            Reject = (<span className="boldtext">Updated. Wait For Approve</span>)
        }else if(this.state.Status==="Rejected" && this.state.UpdateTimes>0 && this.state.HasRejected==="Yes"){
            Reject = (<span className="boldtext">Rejected (Has Updated {this.state.UpdateTimes} time(s))</span>)
        }
         else if (this.state.UpdateTimes > 0) {
            Reject = (<span className="boldtext">{this.state.Status}(Rejected with {this.state.UpdateTimes} times)</span>)
        } else if (this.state.Status === "Approved") {
            Reject = (<span className="boldtext">{this.state.Status}</span>)
        } else if (this.state.Status === "Rejected" && this.state.UpdateTimes === 0) {
            Reject = (<span className="boldtext">{this.state.Status}</span>)
        }
        return (
            <div>
                <TopMenuSigned />
                <div className="Changepass_font">

                    <div className="container" style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', marginBottom: '3%' }}>
                        <div style={{ textAlign: 'center' }}><h2>CV</h2></div>
                        <div style={{ textAlign: 'center' }}>
                            <img style={{ justifyContent: 'center', width: '200px', height: '200px' }} alt="" src={this.state.Image} />
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
                                    <label className="divtext">Link:</label> <input className="divtext" type="text" disabled={this.state.disabled}
                                        onChange={(e) => {
                                            this.setState({
                                                Link: e.target.value
                                            })
                                        }}
                                        value={this.state.Link} />
                                </div>
                            </div>
                            <div className="form-row" style={{ justifyContent: 'center' }}>
                                <div className="form-group col-md-6">
                                    <label className="divtext">Status:</label> {Reject}
                                </div>
                                <div className="form-group col-md-5">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center' }}>
                        {check}

                        <Button type="button" className="btn_reject" onClick={() => this.props.history.push("/cvmanagement")}>BACK</Button></div>

                    <div style={{ marginTop: '5%' }}></div>

                </div>
                <Footer />
                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    isOpen={this.state.modalSave}

                >
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Would you like to update your CV?</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.onSave()} className="btn_OK" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.hide()} className="btn_cancel">Cancel</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    isOpen={this.state.error}
                >
                    <ModalBody>
                        <form>
                            <h2 style={{ textAlign: 'center', color: 'red' }}>ERROR</h2>
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Have some Error...</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.hideERR()} className="btn_cancel">OK</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default DetailImport;
