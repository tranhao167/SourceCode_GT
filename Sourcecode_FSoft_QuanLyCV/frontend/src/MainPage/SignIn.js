import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Modal, ModalBody, Button } from 'reactstrap';

class SignIn extends Component {
  constructor(props) {
    super(props);
    let loggedInEmp = false;
    let loggedInCand = false;
    this.state = {
      accname: '',
      password: '',
      loggedInEmp, loggedInCand, loading: false, roleEmp: '',
      modalwrongpass: false
    }
  }
  hide = () => this.setState({ modalwrongpass: false })
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();
    Axios({
      method: 'POST',
      url: `http://localhost:56058/api/EmpAuth/`,
      data: {
        userName: this.state.accname,
        password: this.state.password
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

    }).then(res => {
      this.setState({
        roleEmp: res.data.getinf.roleid
      })
      if (this.state.roleEmp === 3) {
        localStorage.setItem('auth-jwt-cand-token', JSON.stringify(res.data.getinf.authen));
        localStorage.setItem('auth-jwt-acc-cand', JSON.stringify(res.data.getinf.getacc));
        this.setState({
          loggedInCand: true
        })
        console.clear()
      } else {
        localStorage.setItem('auth-jwt-emp-token', JSON.stringify(res.data.getinf.authen));
        localStorage.setItem('auth-jwt-acc', JSON.stringify(res.data.getinf.getacc));
        this.setState({
          loggedInEmp: true
        })
        console.clear()
      }
    }).catch(err => {
      console.log(err)
      this.setState({
        loading: false, modalwrongpass: true
      });
    })
  }
  render() {
    if (this.state.loggedInEmp) {
      return <Redirect to="/EmployerPage/newcv" />
    }
    if (this.state.loggedInCand) {
      return <Redirect to="/" />
    }
    return (
      <div className="create_emp">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href="/admin"><img src="../../Image/FPT.png"
                alt="Fpt Logo" />  </a>
            </nav>

          </div>
        </div>
        <div className="container" style={{ flex: 'center', marginTop: '10%', marginBottom: '15%', border: "solid 2px black", borderRadius: '1em' }}>
          <form className="form-horizontal" onSubmit={this.onSubmit}>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>Sign In</h2>
            <div className="form-group">

              <div className="col-sm-12">
                <input type="text" className="form-control" placeholder="Account Name"
                  name="accname"
                  value={this.state.accname}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-1"></div>
              <div className="form-group col-md-5">
                <h2 style={{fontSize:'25px'}}>No account? <Link to="/register"><u>Create now</u></Link></h2>
              </div>
              <div className="form-group col-md-3">

              </div>
              <div className="form-group col-md-3">
                <button type="submit" className="btn_signin" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}SignIn</button>

              </div>
            </div>
          </form>
        </div>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.modalwrongpass}
        >
          <ModalBody>
            <form>
              <h2 style={{ textAlign: 'center', color: 'red' }}>ERROR</h2>
              <div className="form-group">
                <p className="boldtext" style={{ textAlign: 'center' }}>Wrong Password</p>
              </div>
              <div className="col-sm-12" style={{ textAlign: 'center' }}>
                <Button onClick={() => this.hide()} className="btn_cancel">OK</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}

export default SignIn;
