import React, { Component } from 'react';
import Menuadmin from './Menuadmin';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ModalBody, Modal } from 'reactstrap';

// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Cvmanagement extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("auth-jwt");
    let loggedIn = true;
    if (token === null) {
      loggedIn = false
    }

    this.state = {
      employers: [],
      totalPages: null,
      pageSize: null,
      currentPage: 1,

      EmpID: null,
      EmpName: null,
      EmpPhone: null,
      Email: null,
      Account: null,
      Password: null,
      Hasdeleted: null,

      showModal: false,

      strgSearch: null,
      ckc: [],
      loggedIn, modalDel: false, modalDelmulti: false,modalempty:false
    }
  }

  openCreate = () => {
    this.setState({
      showModal: true
    })
  }

  // Pagination
  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`http://localhost:56058/api/EmpSearch/?&pageNumber=${pageNumber}`, {
      method: 'GET'

    });

    const data = await response.json();
    this.setState({
      employers: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  componentDidMount() {
    this.makeHttpRequestWithPage(1);

  }
  // End Pagination
  // *****
  // notify
  notify = () => {
    toast.success("Delete Successful!");
  }
  delmultisuccess = () => {
    toast.success("Delete Succ");
  }
  // *****  
  // Delete item
  showmodalDel = (EmpID) => {
    this.setState({
      EmpID: EmpID,
      modalDel: true
    })
  }
  hidemodalDel = () => {
    this.setState({
      modalDel: false
    })
  }
  onDelete = (EmpID) => {

    var { employers, Hasdeleted } = this.state;
    Axios({
      method: 'PUT',
      url: `http://localhost:56058/api/DeletedEmployer/${EmpID}`,
      data: {
        HasDeleted: Hasdeleted
      }
    }).then(res => {
      if (res.status === 200) {
        var index = this.findIndex(employers, EmpID);
        if (index !== -1) {
          employers.splice(index, 1);
          this.setState({
            employers: employers
          })
        }
        this.notify();
        this.hidemodalDel();
      }
    });
  }
  findIndex = (employers, EmpID) => {
    var result = -1;
    employers.forEach((employer, index) => {
      if (employer.EmpID === EmpID) {
        result = index;
      }
    });
    return result;
  }
  // *****
  // Search
  onChange = (e) => {

    this.setState({
      strgSearch: e.target.value
    })
  }
  handleSearch = async (strgSearch) => {
    let response = await fetch(`http://localhost:56058/api/EmpSearch/?QuerySearch=${strgSearch}`, {
      method: 'GET'
    });

    const data = await response.json();

    this.setState({
      employers: data.paginationMetadata.data,
      totalPages: data.paginationMetadata.totalPages,
      pageSize: data.paginationMetadata.pageSize,
      currentPage: data.paginationMetadata.currentPage,
    });
  }
  // *****
  onChangeMulti = (e) => {
    if (e.target.checked === true) {
      this.setState({
        ckc: this.state.ckc.concat({ "EmpID": parseInt(e.target.value) })
      })
    }


  }
  showmodalDelMulti = () => {
    this.setState({
      modalDelmulti: true
    })
  }
  hidemodalDelMulti = () => {
    this.setState({
      modalDelmulti: false
    })
  }
  onDelMulti = () => {
    var Deletemulti = this.state.ckc;
    Axios({
      method: 'PUT',
      url: `http://localhost:56058/api/DeleteMultiEmp/`,
      data: JSON.stringify(Deletemulti),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.notify();
      this.makeHttpRequestWithPage(this.state.currentPage);
      this.hidemodalDelMulti();
    }).catch(err => {
      this.setState({
        modalempty:true
      })
    });
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/admin/login" />
    }
    if (this.state.showModal === true) {
      return <Redirect to="/admin/Create" />
    }
    let employers, renderPageNumbers;

    if (this.state.employers !== null) {
      employers = this.state.employers.map(employer => (
        <tr key={employer.EmpID}>

          <td> <input type="checkbox" aria-label="Checkbox for following text input"
            name="ckc"
            value={employer.EmpID}
            onChange={this.onChangeMulti}
          /></td>
          <td>{employer.EmpID}</td>
          <td>{employer.EmpName}</td>
          <td>{employer.AccName}</td>
          <td>{employer.EmpEmail}</td>
          <td><Link className="btn_detail" to={"/admin/" + employer.EmpID + "/detailEmployer"}>Detail</Link>
            <button className="btn_delete" onClick={() => this.showmodalDel(employer.EmpID)}>Delete</button>

          </td>
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

      <div className="create_emp">
        <ToastContainer style={{ heigh: '100%' }} />
        <Menuadmin />
        <div style={{ marginBottom: '20px' }}></div>
        <form style={{ width: '100%' }}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <Button onClick={() => this.openCreate()} className="btn_Create" >Create a new Employer</Button>
              <Button className="btn_delete_multi" onClick={() => this.showmodalDelMulti()}>Delete</Button>
            </div>
            <div className="form-group col-md-5" >
              <h2>THE EMPLOYER MANAGEMENT</h2>
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
          <table className="table table-hover" style={{ textAlign: 'center',display:'scrolltable' }}>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Employer Name</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>

              {employers}

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
          staticcontext="false"
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.modalDel}
        >
          <ModalBody>
            <h2 style={{ textAlign: 'center' }}>Notification</h2>
            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Do you want to Delete?</p>
            <div className="form-row" style={{ textAlign: 'center' }}>

              <div className="form-group col-md-12">
                <Button className="btn_Del" onClick={() => this.onDelete(this.state.EmpID)}>OK</Button>
                <Button onClick={() => this.hidemodalDel()} className="btn_cancel">Cancel</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* DelMulti */}
        <Modal
          {...this.props}
          staticcontext="false"
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={this.state.modalDelmulti}
        >
          <ModalBody>
            <h2 style={{ textAlign: 'center' }}>Notification</h2>
            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Do you want to Delete all?</p>
            <div className="form-row" style={{ textAlign: 'center' }}>

              <div className="form-group col-md-12">
                <Button className="btn_Del" onClick={() => this.onDelMulti()}>OK</Button>
                <Button onClick={() => this.hidemodalDelMulti()} className="btn_cancel">Cancel</Button>
              </div>
            </div>
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
                <p className="boldtext" style={{ textAlign: 'center' }}>No object selected to delete</p>
              </div>
              <div className="col-sm-12" style={{ textAlign: 'center' }}>
                <Button onClick={() => this.setState({modalempty:false})} className="btn_cancel">OK</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <ToastContainer />
      </div>

    );
  }
}

export default Cvmanagement;
