import React, { Component } from 'react';
import Footer from './Footer';
import TopMenu from './TopMenu';
import Section from './Section';
import TopMenuSigned from './TopMenuSigned';
import SectionSigned from './SectionSigned';
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';


class MainPage extends Component {
    constructor(props) {
        super(props);
        let token = localStorage.getItem('auth-jwt-cand-token');
        let tokenemp=localStorage.getItem('auth-jwt-emp-token');
        this.state = {
            token,tokenemp
        }
    }
    render() {
        if (this.state.token === null && this.state.tokenemp===null) {
            return (

                <div>
                    <TopMenu />
                    <Section />
                    <Footer />
                    <ToastContainer/>
                </div>
            );
        }
        else if (this.state.token !== null && this.state.tokenemp===null) {
           
            return (
                <div>
                    <TopMenuSigned />
                    <SectionSigned />
                    <Footer />
                    <ToastContainer />
                </div>

            );
        }
        else if(this.state.tokenemp!==null && this.state.token===null){
            return <Redirect to="/EmployerPage/newcv"/>
        }

    }
}

export default MainPage;
