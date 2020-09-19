import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

class ModalAcceptRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doneback: false, loading: false,
            arrayAcc: []
        }
    }
    componentDidMount() {
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/CandidateCreate`,
            data: null
        }).then(res => {
            this.setState({
                arrayAcc: res.data
            })
        })
    }
    notify = () => {
        toast.success("Created!")
    }
    errWrongRetype = () => {
        toast.error("Retype does not match")
    }
    errDuplAcc = () => {
        toast.error("Account already exists")
    }
    onSave = () => {
        this.setState({
            loading: true
        })
        let { candname,
            candphone,
            candaddress,
            candemail,
            candbirthday,
            candgender,
            candmajor,
            accname,
            password,
            retype } = this.props
        Axios({
            method: 'POST',
            url: `http://localhost:56058/api/CandidateCreate`,
            data: {
                AccName: accname,
                Password: password,
                CandName: candname,
                CandPhone: candphone,
                CandAddress: candaddress,
                CandGender: candgender,
                CandBirthday: candbirthday,
                CandEmail: candemail,
                CandMajor: candmajor,
                RetypePass: retype
            }
        }).then(res => {
            if(res.status===200){
                this.notify();
                this.setState({
                    doneback: true
                });
            }
            
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 100000)
        }).catch(err => {
            if (retype !== password) {
                this.errWrongRetype()
                this.setState({
                    loading: false
                });
            }else toast.error(err)
            this.state.arrayAcc.forEach((item)=>{
                if(item.AccName===accname){
                    this.errDuplAcc();
                }
                
            })
            this.setState({
                loading: false
            });
        })
    }
    render() {
        if (this.state.doneback) {
            return <Redirect to="/signin" />
        }
        return (
            <div>
                <Modal
                    {...this.props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <ModalBody>
                        <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Would you like to register?</p>
                        <div className="form-row" style={{ textAlign: 'center' }}>

                            <div className="form-group col-md-12">
                                <Button className="btn_OK" onClick={() => this.onSave()} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.props.onhide()} className="btn_cancel">Cancel</Button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <ToastContainer />
            </div>
        );
    }
}

export default ModalAcceptRegister;
