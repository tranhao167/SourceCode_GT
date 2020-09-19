import React, { Component } from 'react';
import Menuadmin from './Menuadmin';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import ModalDel from './ModalDel';

class Cvmanagement extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
    }

    this.state = {
      cvs: null,
      totalPages: null,
      pageSize: null,
      currentPage: 1,

      strgSearch: null,
      ckc: [],
      loggedIn, addModalshow: false
    }
  }
  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`http://localhost:56058/api/CV/?&pageNumber=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    this.setState({
      cvs: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  componentDidMount() {
    this.makeHttpRequestWithPage(1);

  }
  // Search
  onChange = (e) => {
    this.setState({
      strgSearch: e.target.value
    })
  }
  handleSearch = async (strgSearch) => {
    let response = await fetch(`http://localhost:56058/api/CV/?QuerySearch=${strgSearch}`, {
      method: 'GET'
    });

    const data = await response.json();
    this.setState({
      cvs: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  // *****
  //Delete Multi
  onChangeMulti = (e) => {
    if (e.target.checked === true) {
      this.setState({
        ckc: this.state.ckc.concat({ "CandID": parseInt(e.target.value) })
      })
    }
  }
  clickModalMulti = () => {
    this.setState({
      addModalshow: true
    })
  }
  render() {
    let addModalClose = () => this.setState({ addModalshow: false });
    if (this.state.loggedIn === false) {
      return <Redirect to="/admin/login" />
    }
    let cvs, renderPageNumbers;
    if (this.state.cvs !== null) {
      cvs = this.state.cvs.map(cv => (
        <tr key={cv.CandID}>
       
          <td>{cv.CandID}</td>
          <td>{cv.CandName}</td>
          <td>{cv.CandMajor}</td>
          <td>{cv.Startday}</td>
          <td><Link className="btn_detail" to={"/admin/" + cv.CandID + "/detailCV"}>Detail</Link></td>
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
      <div className="Employer_font" >
        <ToastContainer />
        <Menuadmin />
        <div style={{ marginBottom: '20px' }}></div>
        <form style={{ width: '100%' }} >
          <div className="form-row">
            <div className="form-group col-md-4">
             
            </div>
            <div className="form-group col-md-5" >
              <h2>THE CV MANAGEMENT</h2>
            </div>
            <div className="form-group col-md-2">
              <div className="form-row">
                <div className="form-group col-md-9">
                  <input type="text" className="form-control" placeholder="Search..."
                    onChange={(e) => {
                      this.setState({
                        strgSearch: e.target.value
                      })
                    }}
                  />
                </div>
                <div className="form-group col-md-3" style={{ marginLeft: '-3%' }}>
                  <Button className="btn_Search" onClick={() => this.handleSearch(this.state.strgSearch)}>Search</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="scrolltable">
          <table className="table table-hover" style={{ textAlign: 'center', display: 'scrolltable' }}>
            <thead>
              <tr>
               
                <th>ID</th>
                <th>Candidate Name</th>
                <th>Major</th>
                <th>Start day</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {cvs}
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
        <ModalDel
          isOpen={this.state.addModalshow}
          onHide={addModalClose}
          ckc={this.state.ckc}
          currentpage={this.state.currentPage}
          makehttp={this.makeHttpRequestWithPage}
        />
      </div>
    );
  }
}

export default Cvmanagement;
