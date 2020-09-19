import React, { Component } from 'react';
import MenuEmp from './MenuEmp';
import Footer from '../MainPage/Footer';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button, ModalBody } from 'reactstrap';

class Changepass extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('auth-jwt-emp-token');
        let accept = true
        if (token === null) {
            accept = false
            this.state = {
                token,
                oldPass: '',
                newPass: '',
                retypePass: '',
                accname: '',
                back: false, roleEmp: '', accept
            }

        } else
            this.state = {
                token,
                oldPass: "",
                newPass: '',
                retypePass: '',
                accname: JSON.parse(localStorage.getItem("auth-jwt-acc")),
                back: false, roleEmp: '', accept,modal:false,
                newtoken: '',
                newemp: [],
                newacc: []
            }
    }
    componentDidMount(){
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/CandidateInfo?acc=${this.state.accname}`, data: null
        }).then(res => {
            this.setState({
                oldPass: res.data.Pass
            })
        })
    }
    notify = () => {
        toast.success("Changed!");
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickModal=(e)=>{
        e.preventDefault();
        this.setState({
            modal:true
        })
    }

    onPass = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        Axios({
            method: 'PUT',
            url: `http://localhost:56058/api/EmpAuth/`,
            data: {
                accname: this.state.accname,
                password: this.state.newPass,
                retypepass: this.state.retypePass
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        }).then(res => {
            if(res.status===200){
                localStorage.removeItem("auth-jwt-emp-token");
                localStorage.removeItem("auth-jwt-acc");
                this.setState({
                    back:true
                })
            }
            toast.success("Changed! Please Log back in to update the security information!")
        }).catch(err => {
            this.setState({
                loading: false
            })
            alert(err);
        })
        

    }
    render() {
        if (this.state.accept === false) {
            return <Redirect to="/signin" />
        }
        if (this.state.back) {
            return <Redirect to="/signin" />
        }
        return (
            <div className="Employer_font">
                <MenuEmp />
                <div className="container" style={{ border: '1px solid black', borderRadius: '1rem', marginTop: '5%', marginBottom: '3%' }}>

                    <form onSubmit={this.clickModal}>
                        <h2 style={{ textAlign: 'center', marginBottom: '5%', marginTop: '5%' }}>CHANGE PASSWORD</h2>
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
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%', marginBottom: '3%' }}>
                            <button type="submit" className="btn_accept" ><span>OK</span></button>

                            <button type="reset" className="btn_reset">BACK</button>
                        </div>
                    </form>
                    <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    isOpen={this.state.modal}
                >
                    <ModalBody>
                        <form onSubmit={this.onPass}>
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Would you like to change?</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button type="submit" className="btn_OK" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.setState({
                                    modal:false
                                })} className="btn_cancel">Cancel</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Changepass;
