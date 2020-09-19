import React, { Component } from 'react';
import TopMenu from './TopMenu'
import TopMenuSigned from './TopMenuSigned';
import Footer from './Footer';
import TermCaption from './TermCaption';

class Term extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
    this.state = {
      loggedIn
    }
  }else this.state = {loggedIn:true
  }
}
    render() {
        if(this.state.loggedIn===false){
          return(
            <div>
            <TopMenu/>
            <TermCaption/>
            <Footer/>
            </div>
          );
        }else
        return(
          <div>
          <TopMenuSigned/>
          <TermCaption/>
          <Footer/>
          </div>
        );
        
    }
}

export default Term;
