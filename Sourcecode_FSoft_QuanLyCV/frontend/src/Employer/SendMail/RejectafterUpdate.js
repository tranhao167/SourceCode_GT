import React, { Component } from 'react';
import { ModalBody, Modal, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';

class RejectafterUpdate extends Component {
    constructor(props) {
        super(props);
        let loggedOut = false;
        this.state = {
            subject: '[FSoft]_[Notification]_RejectCV After Update',
            body: '',
            loggedOut, loading: false

        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    notify = () => {
        toast.success("SendMail Successful!");
    }
    error = () => {
        toast.error("Error");
    }
    onSend = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        let { subject, body } = this.state;
        let { email } = this.props;
        Axios({
            method: 'POST',
            url: `http://localhost:56058/api/Email/`,
            data: {
                to: email,
                subject: subject,
                body: body
            }
        }).then(res => {
            if (res.status !== 200) {
                this.error();
            }
        }
        );
        Axios({
            method: 'PUT',
            url: `http://localhost:56058/api/RejectCV/`,
            data: {
                Email: email,
                ReReason:body
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    loggedOut: true
                });
                this.notify();
            } else this.error();

        });
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 3000)
    }
    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/EmployerPage/newcv" />
        }
        let { body } = this.state;
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalBody>
                        <h2>Reason of the rejection</h2>
                        <form onSubmit={this.onSend}>
                            <div className="form-group">
                                <label>Reason</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Do not have a good education"
                                    name="body"
                                    value={body}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8"></div>
                                <div className="form-group col-md-4">
                                    <Button type="submit" className="btn_reject_mail" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                    <Button onClick={() => this.props.onHide()} className="btn_cancel">Cancel</Button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                </Modal>
                <ToastContainer />
            </div>
        );
    }
}

export default RejectafterUpdate;
