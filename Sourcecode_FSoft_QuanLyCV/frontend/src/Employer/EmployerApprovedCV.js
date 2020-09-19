import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MenuEmp from './MenuEmp';
import Footer from '../MainPage/Footer';
import Axios from 'axios';
import { Button, ModalBody, Modal } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

class EmployerApprovedCV extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt-acc");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
    }
    this.state = {
      approvedcvs: null,
      totalPages: null,
      pageSize: null,
      currentPage: 1, loggedIn, ckc: [], addModalshow: false, Email: null, body: null,
      modalempty:false,loading:false
    }
  }
  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`http://localhost:56058/api/CVApproved/?&pageNumber=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    this.setState({
      approvedcvs: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  componentDidMount() {
    this.makeHttpRequestWithPage(1);

  }

  clickModalMulti = () => {
    this.setState({
      addModalshow: true
    })
  }

  notify = () => {
    toast.success("Sent!");
  }

  onChangeMulti = (e) => {
    if (e.target.checked === true) {
      this.setState({
        ckc: this.state.ckc.concat({
          "to": e.target.value,
          "subject": "TEST",
          "body": this.state.body
        }),
      })
    }
  }
  onChange = (e) => {
    this.setState({
      ckc: this.state.ckc.map((item) => {
        return {
          ...item,
          body: e.target.value
        }
      })
    })
  }
  onSendMulti = (e) => {
    e.preventDefault();
    
    this.setState({
      loading: true
    })
    Axios({
      method: 'POST',
      url: `http://localhost:56058/api/EmailMulti/`,
      data: JSON.stringify(this.state.ckc)
      , headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if(res.data===""){
        this.setState({
          modalempty:true,loading:false
        })
      }else{
        this.notify();
        this.makeHttpRequestWithPage(this.state.currentPage);
      }
    }).catch(err => {
      
     
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 100000)

  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/signin" />
    }
    let approvedcvs, renderPageNumbers;

    if (this.state.approvedcvs !== null) {
      approvedcvs = this.state.approvedcvs.map(approvedcv => (
        <tr key={approvedcv.CandID} >
          <td> <input type="checkbox" aria-label="Checkbox for following text input"
            name="ckc"
            value={approvedcv.Email}
            onChange={this.onChangeMulti}
          /></td>
          <td>{approvedcv.CandID}</td>
          <td>{approvedcv.CandName}</td>
          <td>{approvedcv.CandMajor}</td>
          <td>{approvedcv.Startday}</td>
          <td><Link className="btn_detail" to={"/EmployerPage/" + approvedcv.CandID + "/detailApproved"}>Detail</Link></td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.totalPages !== null) {
      for (let i = 1; i <= this.state.totalPages; i++) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.currentPage === number ? 'activePagination' : 'notactivePagination';

        return (
          <button key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</button>
        );
      });
    }
    return (
      <div >
        <MenuEmp />
        <div className="Employer_font">
          <form style={{ width: '100%' }} >
            <div className="form-row">
              <div className="form-group col-md-5">
                <Link exact="false" to='/EmployerPage/newcv' className="btn_4" >New CV</Link>
                <Link exact="false" to='/EmployerPage/approvedcv' className="btn_active_newCV" > Approved CV</Link>
                <Link className="btn_4" exact="false" to='/EmployerPage/rejectedcv'> Rejected CV</Link>
              </div>
              <div className="form-group col-md-5">

              </div>
              <div className="form-group col-md-2">
                <Button className="btn_sendmail" onClick={() => this.clickModalMulti()}
                  data-tip="Just send mail for interview"
                  data-place="bottom"
                  data-type="info"
                > Send Mail</Button>
              </div>
            </div>
          </form>
          <div className="scrolltable">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Candidate Name</th>
                  <th>Major</th>
                  <th>Start day</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {approvedcvs}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            {renderPageNumbers}

            <button
              className="btn_paging" onClick={() => {
                if (this.state.currentPage < this.state.totalPages) { this.makeHttpRequestWithPage(this.state.currentPage + 1); }
                if (this.state.currentPage >= this.state.totalPages) { this.makeHttpRequestWithPage(1); }
              }}>Next</button>
          </div>
        </div>
        <Footer />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.addModalshow}
        >
          <ModalBody>
            <h2>Notification of Interview</h2>
            <form onSubmit={this.onSendMulti}>

              <div className="form-group">
                <label>Content</label>
                <input type="text" className="form-control" placeholder="Type content to invite Candidate to interview"
                  name="body"
                  value={this.state.body}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-8"></div>
                <div className="form-group col-md-4">
                  <Button type="submit" className="btn_OK" disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                  <Button onClick={() => this.setState({addModalshow:false})} className="btn_cancel">Cancel</Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>

        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.modalempty}
        >
          <ModalBody>
            <form>
              <h2 style={{ textAlign: 'center', color: 'red' }}>ERROR</h2>
              <div className="form-group">
                <p className="boldtext" style={{ textAlign: 'center' }}>No object selected to send mail</p>
              </div>
              <div className="col-sm-12" style={{ textAlign: 'center' }}>
                <Button onClick={() => this.setState({modalempty:false})} className="btn_cancel">OK</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <ToastContainer /><ReactTooltip />
      </div>
    );
  }
}

export default EmployerApprovedCV;
