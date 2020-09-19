import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Modal, ModalBody, Button } from 'reactstrap';

class AcceptSendmailModal extends Component {
    constructor(props){
        super(props);
        let loggedOut=false;
        this.state={
            subject:'[FSoft]_[Congratulation]_Welcome to Fsoft',
            body:'',
            Status:null,
            loggedOut,loading:false

        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
           })
       }
    notify=()=> {
        toast.success("SendMail Successful! ");
      }
    error=()=>{
        toast.error("Error");
    }
    onSend=(e)=>{
        this.setState({
            loading:true
        })
        e.preventDefault();
        let {subject,body}=this.state;
        let {Email}=this.props;
        Axios({
            method:'POST',
            url: `http://localhost:56058/api/Email/`,
            data: {
               to:Email,
               subject: subject,
               body: body
            }
        }).then(res =>{
            if(res.status!==200){
                this.error()
            }
            
        }
         );
         Axios({
            method:'PUT',
            url: `http://localhost:56058/api/CVApproved/`,
            data: {
                Email:Email,
               Status:this.state.Status
            }
        }).then(res =>{
            if(res.status===200){
                this.setState({
                    loggedOut:true
                });
                
            }else this.error();
            this.notify();
        }
         );  
         setTimeout(()=>{
            this.setState({
            loading:false
            });
          },3000) 
    }
    render() {
        if(this.state.loggedOut){
            return<Redirect to="/EmployerPage/approvedcv"/>
        }
        let {body}=this.state;
        return (
            <div>
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <ModalBody>
                
                <h2>Notification of Interview</h2>
                <form onSubmit={this.onSend}>
                    
                    <div className="form-group">
                        <label>Content</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Type content to invite Candidate to interview"
                        name="body"
                        value={body}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-8"></div>
                    <div className="form-group col-md-4">
                    <Button type="submit" className="btn_reject_mail" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                    <Button onClick={()=>this.props.onHide()}className="btn_cancel">Cancel</Button>
                    </div>
                    </div>
                    </form>
                </ModalBody>
            </Modal>
            <ToastContainer/>
            </div>
        );
    }
}

export default AcceptSendmailModal;
