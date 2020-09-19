import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ModalBack extends Component {
    constructor(props){
        super(props);
        this.state={
            back:false
        }
    }
    onBack=()=>{
        this.setState({
            back:true
        })
    }
    render() {
        if(this.state.back){
            return <Redirect to="/"/>
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
                        <form >
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Do you want to Cancel?</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.onBack()} className="btn_OK">OK</Button>
                                <Button onClick={() => this.props.onhide()} className="btn_cancel">Cancel</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalBack;
