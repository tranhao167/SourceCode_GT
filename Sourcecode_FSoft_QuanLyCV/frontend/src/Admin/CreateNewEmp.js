import React, { Component } from 'react';
import Axios from 'axios';
import Menuadmin from './Menuadmin';
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { Modal, ModalBody, Button } from 'reactstrap';

class CreateNewEmp extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            EmpName: '',
            EmpPhone: '',
            Email: '',
            Account: '',
            Password: '123456',
            nameval: '', phoneval: '', mailval: '', accval: '',
            namevalver: false, phonevalver: false, mailvalver: false, accvalver: false,
            show: null, setShow: null, loggedIn, addmodalblur: false,addModalshow:false,
            goback:false,loading:false
        }
    }

    blur = () => {
        const regexp = /[A-Za-z]/;
        if (regexp.exec(this.state.EmpName)) {
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
        if (regexpPhone.exec(this.state.EmpPhone)) {
            this.setState({
                phoneval: '', phonevalver: true
            })
        } else this.setState({
            phoneval: '*Numberphone has from 10-11 numbers', phonevalver: false
        })
    }
    // Mail
    blurEmail = () => {
        const regexpEmail = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
        if (regexpEmail.exec(this.state.Email)) {
            this.setState({
                mailval: '', mailvalver: true
            })
        } else this.setState({
            mailval: '*Please enter the correct format for Email', mailvalver: false
        })
    }
    // Account
    blurAccount = () => {
        let test = '';
        if (this.state.Account !== test) {
            this.setState({
                accval: '', accvalver: true
            })
        } else if (this.state.Account === test) {
            this.setState({
                accval: '*Please type in it', accvalver: false
            })
        }
    }

    notify = () => {
        toast.success("Create Successful!");
    }
    errorno=()=>{
        toast.error("Account already exists");
    }
    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showModalcreate = (e) => {
        e.preventDefault();
        if (this.state.namevalver === false || this.state.phonevalver === false
            || this.state.mailvalver === false || this.state.accvalver === false) {
            this.setState({
                addmodalblur: true
            })
        } else if (this.state.namevalver === true && this.state.phonevalver === true
            && this.state.mailvalver === true && this.state.accvalver === true) {
            this.setState({
                addModalshow: true
            })
        }
    }
    onhide=()=>{
        this.setState({
            addmodalblur:false
        })
    }

    onHidecreate=()=>{
        this.setState({
            addModalshow: false
        })
    }

    onSave = () => {
        this.setState({
            loading:true
        })
        var { EmpName, EmpPhone, Email, Account, Password } = this.state;
        Axios({
            method: 'POST',
            url: `http://localhost:56058/api/NewEmployer/`,
            data: {
                AccName: Account,
                EmpName: EmpName,
                EmpPhone: EmpPhone,
                EmpEmail: Email,
                Password: Password
            }
        }).then(res => {
            this.setState({
                goback:true
            })
            this.notify();
            setTimeout(()=>{
                this.setState({
                loading:false
                });
              },100000)
        }
        ).catch(err=>{
            this.setState({
                loading:true
            })
            this.errorno();
            this.onHidecreate();
        })
        
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin/login" />
        }
        if (this.state.goback === true) {
            return <Redirect to="/admin/employer" />
        }
        var { EmpName, EmpPhone, Email, Account, Password } = this.state;
        return (
            <div>
                <Menuadmin />
                <div className="create_emp">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%' }}>
                        <h2>THE EMPLOYER MANAGEMENT</h2>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%' }}>
                        <form onSubmit={this.showModalcreate}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">NAME</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control"
                                        name="EmpName"
                                        value={EmpName}
                                        onChange={this.onChange}
                                        onBlur={this.blur}
                                    />
                                    <div className="col-sm-4" style={{ fontSize: '12px', color: 'red' }}>{this.state.nameval}</div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">PHONE</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control"
                                        name="EmpPhone"
                                        value={EmpPhone}
                                        onChange={this.onChange}
                                        onBlur={this.blurPhone}
                                    />
                                    <div className="col-sm-5" style={{ fontSize: '12px', color: 'red' }}>{this.state.phoneval}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">EMAIL</label>
                                <div className="col-sm-6">
                                    <input type="email" className="form-control"
                                        name="Email"
                                        value={Email}
                                        onChange={this.onChange}
                                        onBlur={this.blurEmail}
                                    />
                                    <div className="col-sm-5" style={{ fontSize: '12px', color: 'red' }}>{this.state.mailval}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">ACCOUNT</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control"
                                        name="Account"
                                        value={Account}
                                        onChange={this.onChange}
                                        onBlur={this.blurAccount}
                                    />
                                    <div className="col-sm-5" style={{ fontSize: '12px', color: 'red' }}>{this.state.accval}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">PASSWORD</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" placeholder="123456"
                                        name="Password"
                                        value={Password}
                                        onChange={this.onChange} readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%' }}>
                                <button type="submit" className="btn_accept" >CREATE</button>

                                <button type="reset" className="btn_reset">BACK</button>
                            </div>
                        </form>
                    </div>
                    <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    isOpen={this.state.addmodalblur}
                >
                    <ModalBody>
                        <form >
                            <h2 style={{textAlign:'center',color:'red',fontWeight:'bold'}}>ERROR</h2>
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Please enter all inputs</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.onhide()} className="btn_cancel">OK</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    isOpen={this.state.addModalshow}
                >
                    <ModalBody>
                        <form >
                            
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Would you like to create a new user?</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.onSave()} className="btn_OK" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.onHidecreate()} className="btn_cancel">Cancel</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                </div>
                <ToastContainer/>
            </div>
        );
    }
}

export default CreateNewEmp;
