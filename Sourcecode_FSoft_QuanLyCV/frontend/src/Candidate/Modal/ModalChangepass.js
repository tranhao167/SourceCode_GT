import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class ModalChangepass extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,wrongretype:false,signinagain:false
        }
    }

    clickwrongpass = () => {
        this.setState({
            wrongretype: true
        })
    }
    Hidewrongpass = () => {
        this.setState({
            wrongretype: false
        })
    }
    onSave=(e)=>{
        e.preventDefault();
        var {newpass,retype}=this.props
        Axios({
            method: 'PUT',
            url: `http://localhost:56058/api/EmpAuth/`,
            data: {
                accname: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
                password: newpass,
                retypepass: retype
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        }).then(res => {
            if(res.status===200){
                localStorage.removeItem("auth-jwt-cand-token");
                localStorage.removeItem("auth-jwt-acc-cand");
                this.setState({
                    signinagain:true
                })
            }
            toast.success("Changed! Please Log back in to update the security information!")
        }).catch(err=>{
            if (newpass !== retype) {
                this.clickwrongpass();
                this.props.onhide()
            }
        })
    }
    render() {
        if(this.state.signinagain){
            return <Redirect to="/signin"/>
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
                        <form onSubmit={this.onSave}>
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Would you like to change the information?</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button type="submit" className="btn_OK" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.props.onhide()} className="btn_cancel">Cancel</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <ToastContainer />
                <Modal
                        {...this.props}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        isOpen={this.state.wrongretype}
                        onHide={this.state.wrongretype}
                    >
                        <ModalBody>
                            <h2 style={{ textAlign: 'center',color:'red' }}>Error</h2>
                            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Retype Password Error</p>
                            <div className="form-row" style={{ textAlign: 'center' }}>

                                <div className="form-group col-md-12">
                                    <button className="btn_OK" onClick={() => this.Hidewrongpass()}>OK</button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
            </div>
        );
    }
}

export default ModalChangepass;
