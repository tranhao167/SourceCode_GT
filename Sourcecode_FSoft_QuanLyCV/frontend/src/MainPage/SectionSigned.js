import React, { Component } from 'react';
import Axios from 'axios';
import LandingSigned from './LandingSigned';

class SectionSigned extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-cand-token");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
      this.state = {
        notsignin: false,
        Startday: '',
        create: false, created: false, loggedIn
      }
    } else this.state = {
      notsignin: false,
      AccName: JSON.parse(localStorage.getItem("auth-jwt-acc-cand")),
      Startday: '',
      create: false, created: false, loggedIn,
      import: false, imported: false
    }
  }
  componentDidMount() {
    Axios({
      method: 'GET',
      url: `http://localhost:56058/api/EmpAuth?acc=${this.state.AccName}`, data: null
    }).then(res => {
      this.setState({
        Startday: res.data.inf.Startday,

      })
    })
  }
  render() {
    return (

      <div><section className="banner_part">
      <div className="carousel">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <LandingSigned />
            <img alt='' src="../Image/Capture.PNG" />
          </div>
        </div>
      </div>
    </section></div>
    );
  }
}

export default SectionSigned;
