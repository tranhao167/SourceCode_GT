import React, { Component } from 'react';
import MenuEmp from './MenuEmp';
import Footer from '../MainPage/Footer';
import Axios from 'axios';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmpID: '',
            EmpName: '',
            EmpEmail: '',
            EmpPhone: '',
            accname: JSON.parse(localStorage.getItem("auth-jwt-acc")),
            disabled: true
        }
    }
    componentDidMount() {
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/EmpAuth?acc=${this.state.accname}`, data: null
        }).then(res => {
            this.setState({
                EmpID: res.data.inf.EmpID,
                EmpName: res.data.inf.EmpName,
                EmpEmail: res.data.inf.EmpEmail,
                EmpPhone: res.data.inf.EmpPhone,
                accname: this.state.accname
            });
        })
    }
    render() {
        return (
            <div >
                <MenuEmp />
                <div className="Employer_font">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form onSubmit={this.openDis}>
                                    <div
                                        className="panel-body"
                                        style={{ paddingBottom: "30px", marginBottom: "50px", marginTop: "30px" }}
                                    >
                                        <div className="row">
                                            {/* 0 : ID , NAME */}
                                            <div
                                                className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                                                style={{ marginLeft: "80px", marginTop: "25px" }}
                                            >
                                                <div className="row">
                                                    <div
                                                        className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                        style={{ marginTop: "20px" }}
                                                    >
                                                        <div className="row">
                                                            <span className="label" style={{ width: "120px" }}>
                                                                ID
                            </span>
                                                            <span
                                                                className="label"
                                                                style={{ textAlign: "center" }}
                                                                value={this.state.EmpID}
                                                                key={this.state.EmpID}
                                                            >
                                                                {this.state.EmpID}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* 1 :   PHONE,EMAIL */}
                                            <div
                                                className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                                                style={{ marginLeft: "80px", marginTop: "25px" }}
                                            >
                                                <div className="row">
                                                    <div
                                                        className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                        style={{ marginTop: "20px" }}
                                                    >
                                                        <div className="row">
                                                            <span className="label" style={{ width: "120px" }}>
                                                                PHONE
                            </span>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                className="form-control"
                                                                onChange={this.onChange}
                                                                required
                                                                value={this.state.EmpPhone}
                                                                disabled={this.state.disabled}
                                                                style={{ width: "200px", height: '30px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                        style={{ marginTop: "20px" }}
                                                    >
                                                        <div className="row">
                                                            <span className="label" style={{ width: "120px" }}>
                                                                NAME
                            </span>
                                                            <input
                                                                type="text"
                                                                name="EmpName"
                                                                required
                                                                className="form-control"
                                                                onChange={this.onChange}
                                                                value={this.state.EmpName}
                                                                disabled={this.state.disabled}
                                                                onBlur={this.blur}
                                                                style={{ width: "200px", height: '30px' }}
                                                            />
                                                        </div>
                                                        <div className="col-sm-8" style={{ float: 'right', fontSize: '12px', color: 'red' }}>{this.state.nameval}</div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* 2 : ACCOUNT , ADDRESS*/}

                                            <div
                                                className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                                                style={{ marginLeft: "80px", marginTop: "25px" }}
                                            >
                                                <div className="row">
                                                    <div
                                                        className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                        style={{ marginTop: "20px" }}
                                                    >
                                                        <div className="row">
                                                            <span className="label" style={{ width: "120px" }}>
                                                                EMAIL
                            </span>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                onChange={this.onChange}
                                                                value={this.state.EmpEmail}
                                                                onBlur={this.blurPhone}
                                                                required="required"
                                                                className="form-control"
                                                                disabled={this.state.disabled}
                                                                style={{ width: "200px", height: '30px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                                                        style={{ marginTop: "20px" }}
                                                    >
                                                        <div className="row">
                                                            <span className="label" style={{ width: "120px" }}>
                                                                ACCOUNT
                                                            </span>
                                                            <input
                                                                type="email"
                                                                name=""
                                                                className="form-control"
                                                                onChange={this.onChange}
                                                                disabled={this.state.disabled}
                                                                value={this.state.accname}
                                                                onBlur={this.blurEmail}
                                                                required
                                                                style={{ width: "200px", height: '30px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

        );
    }
}

export default PersonalInfo;
