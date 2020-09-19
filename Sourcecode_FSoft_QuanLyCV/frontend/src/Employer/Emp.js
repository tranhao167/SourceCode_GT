import React, { Component } from 'react';
import MenuEmp from './MenuEmp';
import EmployerNewCV from './EmployerNewCV';
import Footer from '../MainPage/Footer';
import { Redirect } from 'react-router-dom';

class Emp extends Component {
    constructor(props){
        super(props);
        const token=localStorage.getItem("auth-jwt-emp-token");
        let loggedIn=true;
        if(token===null){
          loggedIn=false
        }  
        this.state = {loggedIn}
        }
    render() {
        console.clear();
        if(this.state.loggedIn===false){
            return <Redirect to="/signin"/>
          }
        return (
            <div>
                <MenuEmp/>
                <EmployerNewCV/>
                <div style={{marginBottom:'10px'}}></div>
                <Footer/>
            </div>
        );
    }
}

export default Emp;
