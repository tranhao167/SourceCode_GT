import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import Footer from '../MainPage/Footer';
import MenuEmp from './MenuEmp';

class EmployerRejectedCV extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt-acc");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            rejectedcvs: null,
            totalPages: null,
            pageSize: null,
            currentPage: 1, loggedIn, ckc: [], addModalshow: false, Email: null, body: null,
            new: false, updatenew: null
        }
    }
    makeHttpRequestWithPage = async pageNumber => {
        let response = await fetch(`http://localhost:56058/api/RejectCV/?&pageNumber=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        this.setState({
            rejectedcvs: data.paginationMetadata.data,
            totalPages: data.paginationMetadata.totalPages,
            pageSize: data.paginationMetadata.pageSize,
            currentPage: data.paginationMetadata.currentPage,
        });
    }
    componentDidMount() {
        this.makeHttpRequestWithPage(1);

    }


    render() {
        let rejectedcvs, renderPageNumbers;
        if (this.state.loggedIn === false) {
            return <Redirect to="/signin" />
        }
        if (this.state.rejectedcvs !== null) {
            rejectedcvs = this.state.rejectedcvs.map(rejectedcv =>{
                let classforUpdateday=rejectedcv.HasRejected==="Yes"?"didRej":"twinkle";
                let up=rejectedcv.UpdateNew!==null?rejectedcv.UpdateNew: "Not Update";
               return (
                    <tr key={rejectedcv.CandID} >
                        
                        <td>{rejectedcv.CandID}</td>
                        <td>{rejectedcv.CandName}</td>
                        <td>{rejectedcv.CandMajor}</td>
                        <td>{rejectedcv.Startday}</td>
                        <td><Link className="btn_detail" to={"/EmployerPage/" + rejectedcv.CandID + "/detailRejected"}>Detail</Link></td>
                        <td><p className={classforUpdateday}>{up}</p></td>
    
                    </tr>
                );
            }); 
            
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
            <div>
                <MenuEmp />
                <div className="Employer_font">
                    <form >
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <Link exact="false" to='/EmployerPage/newcv' className="btn_4" >New CV</Link>
                                <Link exact="false" to='/EmployerPage/approvedcv' className="btn_4  " > Approved CV</Link>
                                <Link className="btn_active_newCV" exact="false" to='/EmployerPage/rejectedcv'> Rejected CV</Link>
                            </div>
                            <div className="form-group col-md-5">

                            </div>
                            <div className="form-group col-md-2">
                            </div>
                        </div>
                    </form>
                    <div className="scrolltable">
                        <table className="table table-hover" style={{textAlign:'center'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Candidate Name</th>
                                    <th>Major</th>
                                    <th>Start day</th>
                                    <th>Option</th>
                                    <th>Update Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rejectedcvs}
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
                                    <Button onClick={() => this.onHide()} className="btn_cancel">Cancel</Button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <ToastContainer /><ReactTooltip />
                <Footer />
            </div>
        );
    }
}

export default EmployerRejectedCV;
