import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
const qs = require("qs");

class ModalAcceptChange extends Component {
    constructor(props) {
        super(props);
        let backCan = false
        this.state = {
            loading: false, backCan,
            array:[],
            Startday:'',
            Link:'',
            
        }
    }
    componentDidMount(){
        Axios({
          method:'GET',
          url:`http://localhost:56058/api/EmpAuth?acc=${this.props.accname}`,data:null
        }).then(res=>{
          this.setState({
            Startday:res.data.inf.Startday,
            Link:res.data.inf.Link,
            
          })
        })
      }
    notify = () => {
        toast.success("Changed!")
    }
    onSave = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        var {
            candname,
            candphone,
            candemail,
            gender,
            address,
            major,
            accname,
            password,
            candid,
            candbirthday,
        } = this.props;
        Axios.post(
            `http://localhost:56058/api/PersonalInfomation`,
            qs.stringify({
                CandName: candname,
                CandPhone: candphone,
                Email: candemail,
                CandGender: gender,
                CandAddress: address,
                CandID: candid,
                CandMajor: major,
                AccName: accname,
                Password: password,
                CandBirthday: candbirthday,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
            .then(res => {
                if (res.status === 200) {
                    
                    // localStorage.removeItem("auth-jwt-cand-token");
                    // localStorage.removeItem("auth-jwt-cand");
                    // localStorage.removeItem("auth-jwt-acc-cand");
                    this.setState({
                        backCan: true
                    });
                    this.notify();
                } else this.setState({
                    backCan: false
                })
            });
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 3000)

    };
    render() {
        if (this.state.backCan) {
            return <Redirect to="/" />
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
            </div>
        );
    }
}

export default ModalAcceptChange;
