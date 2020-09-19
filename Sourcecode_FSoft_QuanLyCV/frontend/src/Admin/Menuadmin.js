import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ModalSignOut from './ModalSignOut';
import { Button } from 'reactstrap';

class Menuadmin extends Component {
  constructor(props){
    super(props);
    
    this.state={
      addModalshow:false,
    }
  }
  clickModal=()=>{
    this.setState({
        addModalshow:true
    })
  }
  render() {
    let addModalClose=()=>this.setState({addModalshow:false});
    return (
      <header className="main_menu home_menu">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-11">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="navbar-brand"><img src="../../Image/FPT.png" 
              style={{width: '130px', height:'60px'}} alt="Fpt Logo"/>  </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="menu_icon"><i className="fas fa-bars"></i></span>
              </button>
              <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <div className="nav-link dropdown-toggle" id="navbarDropdown_1" 
                    role="button" data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false" >
                       Management
                    </div>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                      <NavLink className="dropdown-item" exact={false} to="/admin/cv" activeClassName="navactive"> CVs Management</NavLink>
                      <NavLink className="dropdown-item" exact={false} to="/admin/employer" activeClassName="navactive">Employers Management</NavLink>
                      <NavLink className="dropdown-item" exact={false} to="/admin/blogmanagement" activeClassName="navactive">Aritcles Management</NavLink>
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact={false} to="/admin/statistic" activeClassName="navactive">Statistic</NavLink>
                  </li>
                </ul>
              </div>
              <div className="nav-item">
                <Button className="Signin" onClick={()=>this.clickModal()} ><p className="fas fa-user-lock fa-lg"></p> Sign out</Button> 
                <ModalSignOut
                isOpen={this.state.addModalshow}
                addmodalclose={addModalClose}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
      
    </header>
    );
  }
}

export default Menuadmin;
