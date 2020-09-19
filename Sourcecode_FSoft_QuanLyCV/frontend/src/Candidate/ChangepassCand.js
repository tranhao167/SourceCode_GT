import React, { Component } from 'react';
import TopMenuSigned from '../MainPage/TopMenuSigned';
import Footer from '../MainPage/Footer';
import { Redirect } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import ModalChangepass from './Modal/ModalChangepass';
import Axios from 'axios';

class Changepass extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt-cand-token");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
            this.state = {
                oldPass: '',
                newPass: '',
                retypePass: '',
                accname: '',
                wrongretype: false,
                loggedIn, modal: false, Cancel: false

            }
        } else this.state = {
            oldPass: '',
            newPass: '',
            retypePass: '',
            accname: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
            wrongretype: false,
            loggedIn, Cancel: false

        }
    }
    componentDidMount() {
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/CandidateInfo?acc=${this.state.accname}`, data: null
        }).then(res => {
            this.setState({
                oldPass: res.data.Pass
            })
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
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onPass = (e) => {
        e.preventDefault();
        this.setState({
            modal: true
        })
    }
    render() {
        let addmodalclose = () => this.setState({ modal: false })
        if (this.state.loggedIn === false) {
            return <Redirect to="/signin" />
        }
        if (this.state.backCan) {
            return <Redirect to="/personalInformation" />
        }
        return (
            <div>
                <TopMenuSigned />
                <div className="Changepass_font">

                    <div className="container" >
                        <form onSubmit={this.onPass}
                            style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', paddingBottom: '1%' }}>
                            <h2 style={{ textAlign: 'center' }}>CHANGE PASSWORD</h2>
                            <div className="form-row">
                                <div className="form-group col-md-5" style={{ textAlign: 'center' }}>
                                    <div className="divtext">Old Password</div>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="password" className="form-control"
                                        name="oldPass"
                                        value={this.state.oldPass}
                                        onChange={this.onChange}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5" style={{ textAlign: 'center' }}>
                                    <div className="divtext">New Password</div>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="password" className="form-control"
                                        name="newPass"
                                        value={this.state.newPass}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5" style={{ textAlign: 'center' }}>
                                    <div className="divtext">Re-type Password</div>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="password" className="form-control"
                                        name="retypePass"
                                        value={this.state.retypePass}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%', marginBottom: '3%' }}>
                                <button type="submit" className="btn_accept" ><span>OK</span></button>

                                <button type="button" className="btn_reset" onClick={() => this.clickModalCancel()}>BACK</button>
                            </div>
                        </form>
                        <ModalChangepass
                            isOpen={this.state.modal}
                            onhide={addmodalclose}
                            newpass={this.state.newPass}
                            retype={this.state.retypePass}
                        />
                    </div>
                </div>
                <Footer />
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
            </div>

        );
    }
}

export default Changepass;
