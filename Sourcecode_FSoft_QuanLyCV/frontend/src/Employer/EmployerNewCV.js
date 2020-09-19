import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal, ModalBody } from 'reactstrap';
import Axios from 'axios';
import ReactTooltip from "react-tooltip";
class Employer_NewCV extends Component {

  state = {
    newcvs: null,
    totalPages: null,
    pageSize: null,
    currentPage: 1,
    ckc: [],
    Email: null,
    addModalshow: false,
    rejectModalshow: false,
    subject: '[FSoft]_[Notification]_Notification About Interview',
    body: null,
    idchecked: false,modalempty:false
  }
  /***Open Modal */

  clickModalMulti = () => {
    this.setState({
      addModalshow: true
    })
  }
  rejectModal = () => {
    this.setState({
      rejectModalshow: true
    })
  }
  /**** */
  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`http://localhost:56058/api/CVnew/?&pageNumber=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    this.setState({
      newcvs: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  componentDidMount() {
    this.makeHttpRequestWithPage(1);

  }
  // *****
  notify = () => {
    toast.success("Sent!");
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
  onSendMulti = (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault();
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
      this.error(err);
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 100000)

  }

  render() {

    let newcvs, renderPageNumbers;
    if (this.state.newcvs !== null) {
      newcvs = this.state.newcvs.map(newcv => (
        <tr key={newcv.CandID}>
          <td> <input type="checkbox" aria-label="Checkbox for following text input"
            name="ckc"
            value={newcv.Email}
            onChange={this.onChangeMulti}
          /></td>
          <td>{newcv.CandID}</td>
          <td>{newcv.CandName}</td>
          <td>{newcv.CandMajor}</td>
          <td>{newcv.Startday}</td>
          <td><Link className="btn_detail" to={"/EmployerPage/" + newcv.CandID + "/detail"}>Detail</Link></td>
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
      <div className="Employer_font">

        <form style={{ width: '100%' }}>
          <div className="form-row">
            <div className="form-group col-md-5">
              <Link exact="false" to='/EmployerPage/newcv' className="btn_active_newCV" >New CV</Link>
              <Link className="btn_4" exact="false" to='/EmployerPage/approvedcv'> Approved CV</Link>
              <Link className="btn_4" exact="false" to='/EmployerPage/rejectedcv'> Rejected CV</Link>
            </div>
            <div className="form-group col-md-5">

            </div>
            <div className="form-group col-md-2">
              <Button className="btn_sendmail" onClick={() => this.clickModalMulti()}
                data-tip="Just Send mail to Approve CV"
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
              {newcvs}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {renderPageNumbers}
          {/* BUTTON NEXT */}
          <button
            className="btn_paging" onClick={() => {
              if (this.state.currentPage < this.state.totalPages) { this.makeHttpRequestWithPage(this.state.currentPage + 1); }
              if (this.state.currentPage >= this.state.totalPages) { this.makeHttpRequestWithPage(1); }
            }}>Next</button>
        </div>
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

export default Employer_NewCV;
