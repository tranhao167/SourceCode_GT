import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';

class ModalNotsignin extends Component {
    render() {
        return (
            <div>
                 <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
            >
                <ModalBody>
                <h2 style={{textAlign:'center'}}>Notification</h2>
                <p className="boldtext" style={{textAlign:'center',paddingBottom:'5%',paddingTop:'5%'}}>You hasn't signin!</p>
                <div className="form-row" style={{textAlign:'center'}}>
                    
                    <div className="form-group col-md-12">
                    <Link className="btn_function" to="/signin">Sign in</Link>
                    <Link to="/#" onClick={()=>this.props.onHide()}className="btn_cancel">Cancel</Link>
                    </div>
                </div>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

export default ModalNotsignin;
