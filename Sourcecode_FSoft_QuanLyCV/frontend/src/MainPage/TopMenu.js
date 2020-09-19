import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import ModalNotsignin from './ModalNotsignin';

class TopMenu extends Component {
  constructor(props){
    super(props);
    this.state={
      notsignin:false
    }
  }
  onNotsign=()=>{
    this.setState({
      notsignin:true
    })

  }
    render() {
      let addModalClose=()=>this.setState({notsignin:false});
        return (
            <header className="main_menu home_menu">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-11">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="/"><img src="../Image/FPT.png" 
                    style={{width: '130px', height:'60px'}} alt="Fpt Logo"/>  </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="menu_icon"><i className="fas fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <NavLink className="nav-link" exact={true} to="/" activeClassName="navactive">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                          <div className="nav-link dropdown-toggle" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
                            CV Management
                          </div>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                            <Link to="/#" className="dropdown-item" onClick={()=>this.onNotsign()} > Create CV</Link>
                            <Link to="/#" className="dropdown-item" onClick={()=>this.onNotsign()}>Import CV</Link>
                          </div>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" exact={false} to="/contact" activeClassName="navactive">Contact</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div className="nav-item">
                      <Link exact="false" to="/signin" className="Signin"><p className="fas fa-user fa-lg"></p> Sign in</Link> 
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <ModalNotsignin
            isOpen={this.state.notsignin}
            onHide={addModalClose}
            />
          </header>
        
          
        );
    }
}

export default TopMenu;