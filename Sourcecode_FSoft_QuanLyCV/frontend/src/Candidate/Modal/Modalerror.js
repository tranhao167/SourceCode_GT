import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';

class modalerror extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,hide:false
        }
        
    }
    
    render() {
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
                            <h2 style={{textAlign:'center',color:'red',fontWeight:'bold'}}>ERROR</h2>
                            <div className="form-group">
                                <p className="boldtext" style={{ textAlign: 'center' }}>Please enter all inputs</p>
                            </div>
                            <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.props.onhide()} className="btn_cancel">OK</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default modalerror;
