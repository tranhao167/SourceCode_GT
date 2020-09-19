import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Modal, ModalBody, Button } from 'reactstrap';
import Axios from 'axios';


class TopMenuSigned extends Component {
  constructor(props) {
    super(props);
    let loggedOut = false;
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
      this.state = {
        notsignin: false,
        Startday: '',
        create: false, created: false, loggedIn,
      }
    } else this.state = {
      notsignin: false,Startday:'',
      AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
      create: false, created: false, loggedIn,
      import: false, imported: false, loggedOut
    }
  }
  componentDidMount() {
    Axios({
      method: 'GET',
      url: `http://localhost:56058/api/EmpAuth?acc=${this.state.AccName}`, data: null
    }).then(res => { 
      this.setState({
        Startday:res.data.inf.Startday
      })
    });
  }
clickModal = () => {
  this.setState({
    notsignin: true
  })

}

Signout = () => {
  localStorage.removeItem("auth-jwt-cand-token");
  localStorage.removeItem("auth-jwt-acc-cand");
  this.setState({
    loggedOut: true
  })
}
render() {
  if (this.state.loggedIn === false) {
    return <Redirect to="/signin" />
  }
  if (this.state.loggedOut === true) {
    return <Redirect to="/signin" />
  }
  if (this.state.create) {
    return <Redirect to="/createCV" />
  }
  if (this.state.created) {
    return <Redirect to="/cvmanagement" />
  }
  if (this.state.import) {
    return <Redirect to="/importCV" />
  }
  if (this.state.imported) {
    return <Redirect to="/cvmanagement" />
  }
  let check = null;
  if (this.state.Startday === null) {
    check = (
      <header className="main_menu home_menu">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-11">
              <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/"><img src="../Image/FPT.png"
                  style={{ width: '130px', height: '60px' }} alt="Fpt Logo" />  </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="menu_icon"><i className="fas fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" exact={true} to="/" activeclassname="navactive" >Home</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <div className="nav-link dropdown-toggle" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                        CV Management
                        </div>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                        <NavLink to="/createCV" className="dropdown-item" activeclassname="navactive"> Create CV</NavLink>
                        <NavLink to="/importCV" className="dropdown-item" activeclassname="navactive"> Import CV</NavLink>
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" exact={false} to="/Contactsign" activeclassname="navactive">Contact</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="nav-item dropdown">
                  <div className="nav-link dropdown" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                    <Link to="" className="Signin" onClick={() => this.clickModal()}><p className="fas fa-user fa-lg"></p> Sign Out</Link>
                  </div>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                    <NavLink to="/personalInformation" className="dropdown-item" exact={false} activeClassName="navactive">Personal Information</NavLink>
                    <NavLink to="/cvmanagement" className="dropdown-item" exact={false} activeClassName="navactive"> CV Management</NavLink>
                  </div>

                </div>
              </nav>
            </div>
          </div>
        </div>

      </header>
    );
  } else if (this.state.Startday !== null) {
    check = (
      <header className="main_menu home_menu">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-11">
              <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/"><img src="Image/FPT.png"
                  style={{ width: '130px', height: '60px' }} alt="Fpt Logo" />  </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="menu_icon"><i className="fas fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" exact={true} to="/" activeclassname="navactive" >Home</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <div className="nav-link dropdown-toggle" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                        CV Management
                        </div>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                        <Link to="/cvmanagement" className="dropdown-item" activeclassname="navactive"> Create CV</Link>
                        <Link to="/cvmanagement" className="dropdown-item" activeclassname="navactive"> Import CV</Link>
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" exact={false} to="/Contactsign" activeclassname="navactive">Contact</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="nav-item dropdown">
                  <div className="nav-link dropdown" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                    <Link to="" className="Signin" onClick={() => this.clickModal()}><p className="fas fa-user fa-lg"></p> Sign Out</Link>
                  </div>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                    <NavLink to="/personalInformation" className="dropdown-item" exact={false} activeClassName="navactive">Personal Information</NavLink>
                    <NavLink to="/cvmanagement" className="dropdown-item" exact={false} activeClassName="navactive"> CV Management</NavLink>
                  </div>

                </div>
              </nav>
            </div>
          </div>
        </div>

      </header>
    );
  }
  return (
    <div>
      {check}
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={this.state.notsignin}
      >
        <ModalBody>
          <h2 style={{ textAlign: 'center' }}>Notification</h2>
          <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Do you want to Sign Out?</p>
          <div className="form-row" style={{ textAlign: 'center' }}>

            <div className="form-group col-md-12">
              <Button className="btn_reject_mail" onClick={() => this.Signout()}>OK</Button>
              <Button onClick={() => {
                this.setState({
                  notsignin: false
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

export default TopMenuSigned;
