import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';


class SignInModal extends Component {
    constructor(props){
        super(props);
        let loggedOut=false;
        this.state={
            loggedOut
        }
    }
    
    SignoutAdmin=()=>{
        localStorage.removeItem("auth-jwt");
        this.setState({
            loggedOut:true
        })
    }
    onHide=()=>{
        this.props.addmodalclose();
    }
    render() {
        if(this.state.loggedOut){
            return <Redirect to="/admin/login"/>
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
                <h2 style={{textAlign:'center'}}>Notification</h2>
                <p className="boldtext" style={{textAlign:'center',paddingBottom:'5%',paddingTop:'5%'}}>Do you want to Sign Out?</p>
                <div className="form-row" style={{textAlign:'center'}}>
                    
                    <div className="form-group col-md-12">
                    <Button className="btn_reject_mail" onClick={()=>this.SignoutAdmin()}>OK</Button>
                    <Button onClick={()=>this.onHide()}className="btn_cancel">Cancel</Button>
                    </div>
                </div>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

export default SignInModal;
