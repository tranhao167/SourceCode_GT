import React, { Component } from "react";
import TopMenuSigned from '../MainPage/TopMenuSigned';
import Footer from '../MainPage/Footer';

import moment from "moment";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "reactstrap";
import Axios from "axios";
class CVManagement extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
      this.state = {
        CandName: '',
        Startday: '',
        Link: '',
        loggedIn
      }
    } else

      this.state = {
        AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
        loggedIn,
        Link: "",
        CandName: "",
        CandPhone: "",
        Email: '',
        CandGender: '',
        CandAddress: '',
        CandBirthday: '',
        CandMajor: '',
        CandID: '',
        Startday: '',
        Image: '',
        delmodal: false, ckc: [], array: {}, back: false, detail: false, detailIM: false, delim: false
      }
  }
  componentDidMount() {
    Axios({
      method: 'GET',
      url: `http://localhost:56058/api/EmpAuth?acc=${this.state.AccName}`, data: null
    }).then(res => {
      this.setState({
        CandID: res.data.inf.CandID,
        CandName: res.data.inf.CandName,
        CandPhone: res.data.inf.CandPhone,
        Email: res.data.inf.Email,
        CandGender: res.data.inf.CandGender === 1 ? "Male" : "Female",
        CandAddress: res.data.inf.CandAddress,
        CandBirthday: res.data.inf.CandBirthday,
        CandMajor: res.data.inf.CandMajor,
        Startday: res.data.inf.Startday,
        Image: res.data.inf.Image,
        Link: res.data.inf.Link
      })
    })
  }
  delmodal = () => {
    this.setState({
      ckc: [{ CandID: parseInt(this.state.CandID) }],
      delmodal: true
    })
  }
  onHide = () => {
    this.setState({
      delmodal: false
    })
  }
  // Delete item
  hidemodalDel = () => {
    this.setState({
      delmodal: false
    })
  }
  notify = () => {
    toast.success('Deleted')
  }


  openDetail = () => {
    this.setState({
      detail: true
    })
  }
  openDetailImport = () => {
    this.setState({
      detailIM: true
    })
  }
  delImport = () => {
    this.setState({
      delim: true
    })
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/signin" />
    }
    if (this.state.back === true) {
      return <Redirect to="/" />
    }
    if (this.state.detail === true) {
      return <Redirect to="/Detail" />
    }
    if (this.state.detailIM === true) {
      return <Redirect to="/DetailImport" />
    }
    let check = null;
    if (this.state.Startday !== null) {
      if (this.state.Link === null) {
        check = (
          <div className="row ml-50">

            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <img src={this.state.Image} id="target" alt={this.state.Image} style={{ width: '220px', height: '180px', marginLeft: '2%', marginTop: '2%', marginBottom: '2%' }} />
            </div>

            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">

              <div className="row" style={{ fontSize: "24px" }}>
                The Created CV
                  </div>
              <div className="row" style={{ fontSize: "24px" }}>
                {this.state.CandName}
              </div>
              <div className="row" style={{ fontSize: "24px" }}>
                {moment(this.state.Startday).format(
                  "DD/MM/YYYY"

                )}
              </div>
              <div className="row" style={{ fontSize: "24px", marginBottom: '2%' }}>
                <Button className="btn_Edit" onClick={() => this.openDetail()}>Detail</Button>
              </div>
                  
            </div>
            <ToastContainer/>
          </div>);
      } else if (this.state.Link !== null) {
        check = (<div className="row ml-50">

          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <img src={this.state.Image} id="target" alt={this.state.Image} style={{ width: '220px', height: '180px', marginLeft: '2%', marginTop: '2%', marginBottom: '2%' }} />
          </div>

          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">

            <div className="row" style={{ fontSize: "24px" }}>
              The Imported CV
              </div>
            <div className="row" style={{ fontSize: "24px" }}>
              {this.state.CandName}
            </div>
            <div className="row" style={{ fontSize: "24px" }}>
              {moment(this.state.Startday).format(
                "DD/MM/YYYY"

              )}
            </div>
            <div className="row" style={{ fontSize: "24px", marginBottom: '2%' }}>
              <Button className="btn_Edit" onClick={() => this.openDetailImport()}>Detail</Button>
            </div>
                <ToastContainer/>
          </div>


        </div>);
      }
    }
    else if (this.state.Startday === null) {
      check = (<div className="row ml-50" style={{ textAlign: 'center' }}>
        <p className="divtext" style={{ textAlign: 'center' }}>You haven't created cv yet.Click <a href="/createCV">Here</a> to Create a new CV</p>
      </div>)
    }
    return (
      <div>
        <TopMenuSigned />
        <div className="Employer_font">
          <div className="container" >
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form className="bg-white"
                  style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', marginTop: '10%', marginBottom: '7%' }}>
                  <div className="form-group">

                    <div className="panel panel-info">
                      <div className="panel-body">
                        {check}
                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <ToastContainer />
      </div>
    );
  }
}

export default CVManagement;
