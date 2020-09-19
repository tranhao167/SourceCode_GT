import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Modal, ModalBody, Button } from 'reactstrap';

class Loginadmin extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt");
    let loggedIn = true;
    if (token === null) {
        loggedIn = false
    }
    this.state = {
      accname: '',
      password: '',
      addModalshow: false,
      loggedIn, loading: false,
      modalerr: false
    }
  }
  showModal = () => this.setState({ addModalshow: true });
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onAuth = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();
    Axios({
      method: 'POST',
      url: `http://localhost:56058/api/AdminAuth`,
      data: {
        userName: this.state.accname,
        password: this.state.password
      },
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      const data = JSON.stringify(res.data.getinf)
      localStorage.setItem('auth-jwt', data);
      this.setState({
        loggedIn: true
      })
      console.clear();
    }).catch(err => {
      this.setState({
        modalerr: true,
        loading:false
      })
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 100000)
    });

  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/admin/employer" />
    }
    return (
      <div className="create_emp">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href="/"><img src="../../Image/FPT.png"
                alt="Fpt Logo" />  </a>
            </nav>

          </div>
        </div>
        <div className="container" style={{ flex: 'center', marginTop: '10%', marginBottom: '15%', border: "solid 2px black", borderRadius: '1em' }}>
          <form className="form-horizontal" onSubmit={this.onAuth}>
            <h2 style={{ textAlign: 'center', marginTop: '15px', marginBottom: '10px' }}><p className="fas fa-user-lock fa-lg"></p></h2>
            <div className="form-group">

              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Account Name"
                  name="accname"
                  value={this.state.accname}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-1"></div>
              <div className="form-group col-md-5"></div>
              <div className="form-group col-md-3"></div>
              <div className="form-group col-md-3">
                <button type="submit" className="btn_signin" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}Log In</button>
              </div>
            </div>
          </form>
        </div>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.modalerr}
        >
          <ModalBody>
            <form>
              <h2 style={{ textAlign: 'center', color: 'red' }}>ERROR</h2>
              <div className="form-group">
                <p className="boldtext" style={{ textAlign: 'center' }}>Wrong Password</p>
              </div>
              <div className="col-sm-12" style={{ textAlign: 'center' }}>
                <Button onClick={() => this.setState({ modalerr: false })} className="btn_cancel">OK</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Loginadmin;
