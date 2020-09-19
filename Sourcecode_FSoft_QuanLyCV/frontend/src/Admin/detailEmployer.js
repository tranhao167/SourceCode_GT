import React, { Component } from 'react';
import Menuadmin from './Menuadmin';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class detailEmployer extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            EmpID: null,
            EmpName: 'abc',
            EmpPhone: 'abc',
            Email: 'abc',
            Account: 'abc',
            Password: 'abc',
            loggedIn
        }
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var EmpID = match.params.id;
            Axios({
                method: 'GET',
                url: `http://localhost:56058/api/Employerlist/${EmpID}`,
                data: null
            }).then(res => {
                // console.log(res.data);    
                var data = res.data;
                this.setState({
                    EmpID: data.EmpID,
                    EmpName: data.EmpName,
                    EmpPhone: data.EmpPhone,
                    Email: data.EmpEmail,
                    Account: data.AccName,
                    Password: data.Password
                });
            }
            );
        }
    }

    onBack = () => {
        this.props.history.push("/admin/employer");
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    clickBlank = () => {

    }
    onSave = (e) => {
        e.preventDefault();
        var { EmpID, EmpName, EmpPhone, Email, Account, Password } = this.state;
        if (EmpID) {
            Axios({
                method: 'PUT',
                url: `http://localhost:56058/api/NewEmployer/`,
                data: {
                    EmpID: EmpID,
                    AccName: Account,
                    EmpName: EmpName,
                    EmpPhone: EmpPhone,
                    EmpEmail: Email,
                    Password: Password
                }
            }).then(res => {
                console.log(res);
            }
            );
        }
        this.props.history.push("/admin/employer");
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin/login" />
        }
        return (
            <div>
                <Menuadmin />
                <div className="Changepass_font">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center' }}>
                        <h2>THE EMPLOYER MANAGEMENT</h2>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%' }}>
                        <form onSubmit={this.onSave}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">ID</label>
                                <div className="col-sm-6">
                                    <div className="divtext">{this.state.EmpID}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">NAME</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control"
                                        name="EmpName"
                                        value={this.state.EmpName}
                                        onChange={this.onChange}
                                      
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">PHONE</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" value={this.state.EmpPhone}
                                        name="EmpPhone"
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">EMAIL</label>
                                <div className="col-sm-6">
                                    <input type="email" className="form-control" value={this.state.Email}
                                        name="Email"
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">ACCOUNT</label>
                                <div className="col-sm-8">
                                    <div>
                                        <div className="form-group row">
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="staticPass"
                                                    value={this.state.Account}
                                                    name="Account"
                                                    onChange={this.onChange}
                                                  
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row" style={{ marginTop: '-1%' }}>
                                <label className="col-sm-2 col-form-label">PASSWORD</label>
                                <div className="col-sm-8">
                                    <div>
                                        <div className="form-group row">

                                            <div className="col-sm-9">
                                                <input type="password" className="form-control" id="staticPass"
                                                    value={this.state.Password}
                                                    name="Password"
                                                    onChange={this.onChange}
                                                  disabled
                                                />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%' }}>
                                <button type="submit" className="btn_accept">ACCEPT</button>

                                <button type="button" className="btn_reset" onClick={this.onBack}>BACK</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default detailEmployer;
