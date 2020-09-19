import React, { Component } from 'react';
import Menuadmin from '../Menuadmin';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Footer from '../../MainPage/Footer'
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

class Blog extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }

        this.state = {
            blogs: null,
            totalPages: null,
            pageSize: null,
            currentPage: 1,
            loading: false,
            strgSearch: null,
            ckc: [],
            loggedIn, addModalshow: false,
            BlogID: '', modalDel: false, Hasdeleted: ''
        }
    }
    makeHttpRequestWithPage = async pageNumber => {
        let response = await fetch(`http://localhost:56058/api/BlogCreate/?&pageNumber=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        this.setState({
            blogs: data.paginationMetadata.data,
            totalPages: data.paginationMetadata.totalPages,
            pageSize: data.paginationMetadata.pageSize,
            currentPage: data.paginationMetadata.currentPage,
        });
    }
    componentDidMount() {
        this.makeHttpRequestWithPage(1);

    }
    handleSearch = async (strgSearch) => {
        let response = await fetch(`http://localhost:56058/api/BlogCreate/?QuerySearch=${strgSearch}`, {
            method: 'GET'
        });

        const data = await response.json();
        this.setState({
            blogs: data.paginationMetadata.data,
            totalPages: data.paginationMetadata.totalPages,
            pageSize: data.paginationMetadata.pageSize,
            currentPage: data.paginationMetadata.currentPage,
        });
    }
    createblog = () => {
        this.setState({
            create: true
        })
    }
    onDelete = (BlogID) => {
        this.setState({
            loading: true
        })
        var { blogs, Hasdeleted } = this.state;
        Axios({
            method: 'PUT',
            url: `http://localhost:56058/api/BlogCreate?id=${BlogID}`,
            data: {
                HasDeleted: Hasdeleted
            }
        }).then(res => {
            if (res.status === 200) {
                var index = this.findIndex(blogs, BlogID);
                if (index !== -1) {
                    blogs.splice(index, 1);
                    this.setState({
                        blogs: blogs
                    })
                }
                this.setState({
                    modalDel: false
                })
                toast.success("Deleted!")
            } else setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 100000)
        });
    }
    findIndex = (blogs, BlogID) => {
        var result = -1;
        blogs.forEach((blog, index) => {
            if (blog.BlogID === BlogID) {
                result = index;
            }
        });
        return result;
    }
    showmodalDel = (BlogID) => {
        this.setState({
            BlogID: BlogID,
            modalDel: true
        })
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin/login" />
        }
        if (this.state.create) {
            return <Redirect to="/admin/createnewBlog" />
        }
        let blogs, renderPageNumbers;

        if (this.state.blogs !== null) {
            blogs = this.state.blogs.map(blog => (
                <tr key={blog.BlogID}>
                    <td>{blog.BlogID}</td>
                    <td>{blog.Subject}</td>
                    <td>{blog.Status}</td>
                    <td><Link className="btn_detail" to={"/admin/" + blog.BlogID + "/blogmanagement"}>Detail</Link>
                        <Link className="btn_delete" to='#' onClick={() => this.showmodalDel(blog.BlogID)}>Delete</Link></td>
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
            <div>
                <div className="create_emp">
                    <Menuadmin />
                    <div style={{ marginBottom: '20px' }}></div>
                    <form style={{ width: '100%' }} >
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <Button className="btn_Create" onClick={() => this.createblog()}>Create new Blog</Button>
                            </div>
                            <div className="form-group col-md-5" >
                                <h2>THE ARTICLE MANAGEMENT</h2>
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
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs}
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
                                <Button className="btn_Del" onClick={() => this.onDelete(this.state.BlogID)} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                <Button onClick={() => this.setState({ modalDel: false })} className="btn_cancel">Cancel</Button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <Footer />
                <ToastContainer />
            </div>

        );
    }
}

export default Blog;
