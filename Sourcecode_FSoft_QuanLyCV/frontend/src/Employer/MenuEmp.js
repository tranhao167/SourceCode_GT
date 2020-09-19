import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Modal, ModalBody, Button } from 'reactstrap';


class MenuEmp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addModalshow: false,
      EmpID: '',
      EmpName: '',
      EmpEmail: '',
      EmpPhone: '',
      accname: '',
      password: '',
      loggedOut:false
    }
  }
  clickModal = () => {
    this.setState({
      addModalshow: true
    })

  }
  Signout=()=>{
    localStorage.removeItem("auth-jwt-emp-token");
    localStorage.removeItem("auth-jwt-acc");
    this.setState({
        loggedOut:true
    })
}
  render() {
    if(this.state.loggedOut){
      return <Redirect to="/signin"/>
    }
    return (
      <div>
        <header className="main_menu home_menu">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-11">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <a className="navbar-brand" href="/"><img src="../../Image/FPT.png"
                    style={{ width: '130px', height: '60px' }} alt="Fpt Logo" />  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="menu_icon"><i className="fas fa-bars"></i></span>
                  </button>
                  <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <NavLink className="nav-link" exact={true} to="/" activeClassName="navactive">Home</NavLink>
                      </li>
                      <li className="nav-item dropdown">
                        <NavLink className="nav-link"
                          exact={false} to="/EmployerPage/newcv" style={{ backgroundColor: '#979797' }}
                          role="button" >
                          CV Management
                          </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="nav-item dropdown">
                    <div className="nav-link dropdown" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                      <Link to="" className="Signin" onClick={() => this.clickModal()} ><p className="fas fa-user-shield fa-lg"></p> Sign out</Link>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                      <NavLink to="/EmployerPage/ChangePassword" className="dropdown-item" exact={false} activeClassName="navactive"> Change Password</NavLink>
                      <NavLink to="/EmployerPage/PersonalInformation" className="dropdown-item" exact={false} activeClassName="navactive">Personal Information</NavLink>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.addModalshow}
        >
          <ModalBody>
            <h2 style={{ textAlign: 'center' }}>Notification</h2>
            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Do you want to Sign Out?</p>
            <div className="form-row" style={{ textAlign: 'center' }}>

              <div className="form-group col-md-12">
                <Button className="btn_reject_mail" onClick={() => this.Signout()}>OK</Button>
                <Button onClick={() => {
                  this.setState({
                    addModalshow: false
                  })
                }} className="btn_cancel">Cancel</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MenuEmp;
