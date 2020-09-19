import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';

class ModalDel extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
    }
    this.state = {
      loggedIn, loading: false
    }
  }
  notify = () => {
    toast.success("Delete Successful!");
  }
  errorno = () => {
    toast.error("PLease choose CV to delete");
  }
  onDelMulti = () => {
    let { ckc, currentpage } = this.props
    var Deletemulti = ckc;
    this.setState({
      loading: true
    })
    if(ckc===[]){
      this.errorno();
    }
    Axios({
      method: 'PUT',
      url: `http://localhost:56058/api/DeleteMultiCand/`,
      data: JSON.stringify(Deletemulti),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status !== 200) {
        alert("ERROR");
        this.props.onHide();
      }
      this.notify();
      this.props.makehttp(currentpage);
      this.props.onHide();
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 100000)
    }).catch(err => {
    });
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
            <h2 style={{ textAlign: 'center' }}>Notification</h2>
            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Do you want to Delete?</p>
            <div className="form-row" style={{ textAlign: 'center' }}>

              <div className="form-group col-md-12">
                <Button className="btn_Del" onClick={() => this.onDelMulti()} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                <Button onClick={() => this.props.onHide()} className="btn_cancel">Cancel</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalDel;
