import React, { Component } from 'react';
import Menuadmin from '../Menuadmin';
import { Link, Redirect } from 'react-router-dom';

class newEmployer extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
    }
    this.state = {
      newemployers: null,
      totalPages: null,
      pageSize: null,
      currentPage: 1,
      loggedIn
    }
  }
  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`http://localhost:56058/api/EmpSearch/?&pageNumber=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    this.setState({
      newemployers: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  componentDidMount() {
    this.makeHttpRequestWithPage(1);

  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/admin/login" />
    }
    let newemployers, renderPageNumbers;
    if (this.state.newemployers !== null) {
      newemployers = this.state.newemployers.map(newemployer => (
        <tr key={newemployer.EmpID}>
          <td></td>
          <td>{newemployer.EmpID}</td>
          <td>{newemployer.EmpName}</td>
          <td>{newemployer.AccName}</td>
          <td>{newemployer.EmpEmail}</td>

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
        <Menuadmin />
        <form style={{ width: '100%' }}>
          <div className="form-row">
            <div className="form-group col-md-9">
              <Link exact="false" to='/admin/newemployer' className="btn_active_newCV" >New Employers</Link>
              <Link className="btn_4" exact="false" to='/admin/deletedemployer'> Deleted Employers</Link>
              <Link className="btn_4" exact="false" to='/admin/approvedcv'> Approved CVs</Link>
            </div>
            <div className="form-group col-md-3"></div>
          </div>
        </form>

        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Employer Name</th>
              <th>Account Name</th>
              <th>Email</th>

            </tr>
          </thead>
          <tbody>
            {newemployers}
          </tbody>
        </table>
        <div className="pagination" style={{marginBottom:'20%'}}>
          {renderPageNumbers}
          {/* BUTTON NEXT */}
          <button
            className="btn_paging" onClick={() => {
              if (this.state.currentPage < this.state.totalPages) { this.makeHttpRequestWithPage(this.state.currentPage + 1); }
              if (this.state.currentPage >= this.state.totalPages) { this.makeHttpRequestWithPage(1); }
            }}>Next</button>
        </div>

      </div>
    );
  }
}

export default newEmployer;
