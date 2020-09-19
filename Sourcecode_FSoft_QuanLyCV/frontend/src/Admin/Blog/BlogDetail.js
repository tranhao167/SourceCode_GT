import React, { Component } from 'react';
import Menuadmin from '../Menuadmin';
import Footer from '../../MainPage/Footer';
import Axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, ModalBody, Button } from 'reactstrap';

class BlogDetail extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt");
        let loggedIn = true;
        if (token === null) {
            this.setState({
                loggedIn: false
            })
        }

        this.editor = null;
        this.state = {
            loggedIn,
            selectedfile: '',
            Subject: '',
            ImageMain: '',
            ContentBlog: '',
            Description: '',
            Status: '',
            BlogID: '',
            adminID: '',
            accname: JSON.parse(localStorage.getItem("auth-jwt")).getacc,
            disabled: true,
            open: false,
            edit: true,
            modalOK:false
        }
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var BlogID = match.params.id;
            Axios({
                method: 'GET',
                url: `http://localhost:56058/api/DetailBlog?id=${BlogID}`,
                data: null
            }).then(res => {
                // console.log(res.data);    
                var data = res.data;
                this.setState({
                    BlogID: data.BlogID,
                    Subject: data.Subject,
                    ImageMain: data.ImageMain,
                    ContentBlog: data.ContentBlog,
                    Description: data.Description,
                    Status: data.Status
                });
            }
            );
        }
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/AdminAuth?acc=${this.state.accname}`, data: null
        }).then(res => {
            this.setState({
                adminID: res.data.AdminID
            })
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    changeRadio=(e)=>{
        if (e.target.checked) {
            this.setState({
              Status: e.target.value
            })
          }
    }
    openText = (e) => {
        e.preventDefault();
        this.setState({
            open: true,
            disabled: false
        })
    }
    openModal=()=>{
        this.setState({
            modalOK:true
        })
    }
    save = () => {
        Axios({
            method: 'PUT',
            url: `http://localhost:56058/api/DetailBlog`,
            data: {
                BlogID: this.state.BlogID,
                AdminID: this.state.adminID,
                Subject: this.state.Subject,
                Status:this.state.Status,
                ImageMain: this.state.ImageMain,
                ContentBlog: this.state.ContentBlog,
                Description: this.state.Description,
                ModifiedBy: this.state.accname
            }
        }).then(res => {
            toast.success("Changed!")
            console.clear();    
            this.setState({
                back: true
            })
        }).catch(err => {

        });
    }
    upLoad = () => {
        this.setState({
            loading: true
        })
        const data = new FormData();
        data.append("file", this.state.selectedfile);
        data.append("upload_preset", "boywaygl");
        this.setState({
            setLoading: true
        })
        Axios.post("https://api.cloudinary.com/v1_1/boywaygl/image/upload", data)
            .then((response) => {
                this.setState({
                    setImage: response.data.url,
                    setLoading: false,
                });
                if (response.status === 200) {
                    Axios({
                        method: 'PUT',
                        url: `http://localhost:56058/api/DetailBlog`,
                        data: {
                            BlogID: this.state.BlogID,
                            AdminID: this.state.adminID,
                            Subject: this.state.Subject,
                            Status:this.state.Status,
                            ImageMain: this.state.setImage,
                            ContentBlog: this.state.ContentBlog,
                            Description: this.state.Description,
                            ModifiedBy: this.state.accname
                        }
                    }).then(res => {
                        toast.success("Changed!")
                        this.setState({
                            back: true
                        })
                    }).catch(err => {
                        setTimeout(() => {
                            this.setState({
                                loading: false
                            });
                        }, 100000)
                        alert(err)
                    });
                }
            }).catch(err => {
                this.save();
            });

    }
    onImageChange = (e) => {
        this.setState({
            selectedfile: e.target.files[0],
            ImageMain: URL.createObjectURL(e.target.files[0])
        })
    }
    render() {
        if (this.state.back) {
            return <Redirect to='/admin/blogmanagement' />
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin/login" />
        }
        let check = null;
        if (this.state.open === false) {
            check = (<button type="submit" className="btn_Edit" ><span>EDIT</span></button>)
        } else check = (<button type="button" className="btn_accept" onClick={() => this.openModal()} ><span>SAVE</span></button>)
        return (
            <div>

                <div className="Employer_font">
                    <Menuadmin />
                    <div className="container" style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', paddingBottom: '1%', marginTop: '3%' }}>
                        <form onSubmit={this.openText} style={{ width: '100%' }}>
                            <h2 style={{ textAlign: 'center', marginBottom: '5%', marginTop: '5%' }}>ARTICLE INFORMATION</h2>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <div className="divtext">IMAGE</div>
                                </div>
                                <div className="form-group col-md-12">
                                    <div style={{ width: "100%", height: "300px" }}>
                                        <input
                                            type="file"
                                            id="file"
                                            className="custom-up-avatar"
                                            onChange={this.onImageChange}
                                            disabled={this.state.disabled}
                                        />
                                        {this.state.setLoading ? (
                                            <p>loading.........</p>
                                        ) : (
                                                <label htmlFor="file" className="labelforfile">
                                                    <div className="camera-hover">
                                                        <div className='div-i'>
                                                            <i
                                                                className="fas fa-camera fa-2x"
                                                                style={{ color: "gray" }}
                                                            ></i>
                                                        </div>

                                                        <img
                                                            src={this.state.ImageMain}
                                                            className="image-import"
                                                            alt={this.state.ImageMain}
                                                        />
                                                    </div>
                                                </label>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <div className="divtext">SUBJECT</div>
                                </div>
                                <div className="form-group col-md-12">
                                    <input type="text" className="form-control"
                                        name="Subject"
                                        disabled={this.state.disabled}
                                        value={this.state.Subject}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <div className="divtext">DESCRIPTION</div>
                                </div>
                                <div className="form-group col-md-12">
                                    <textarea
                                        name="Description"
                                        value={this.state.Description}
                                        onChange={this.onChange}
                                        rows="5"
                                        style={{ width: '100%' }}
                                        disabled={this.state.disabled}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <div className="divtext">CONTENT</div>
                                </div>
                                <div className="form-group col-md-12">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={this.state.ContentBlog}
                                        onInit={editor => {
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({
                                                ContentBlog: data
                                            })
                                        }}
                                        disabled={this.state.disabled}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <div className="divtext">PUT THIS ARTICLE ON THE CAROUSEL</div>
                                </div>
                                <div className="form-group col-md-7">
                                    <div className="radio">
                                        <label>
                                            <input
                                                type="radio"
                                                onChange={this.changeRadio}
                                                value="In Carousel"
                                                name="Status"
                                                checked={this.state.Status === "In Carousel"}
                                            />
                                            <span
                                                className="label"
                                                style={{ marginLeft: "10px" }}
                                            >
                                                YES
                                </span>
                                        </label>
                                        <label style={{ marginLeft: "50px" }}>
                                            <input
                                                type="radio"
                                                onChange={this.changeRadio}
                                                disabled={this.state.disabled}
                                                value="Not In Carousel"
                                                name="Status"
                                                checked={this.state.Status === "Not In Carousel"}
                                            />
                                            <span
                                                className="label"
                                                style={{ marginLeft: "10px" }}
                                            >
                                                NO
                                </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center', marginTop: '3%', marginBottom: '3%' }}>

                                {check}
                                <button type="reset" className="btn_reset">BACK</button>
                            </div>
                        </form>
                    </div>
                    <Modal
                        {...this.props}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        isOpen={this.state.modalOK}
                    >
                        <ModalBody>
                            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Would you like to Change this Article?</p>
                            <div className="form-row" style={{ textAlign: 'center' }}>

                                <div className="form-group col-md-12">
                                    <Button className="btn_OK" onClick={() => this.upLoad()} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                    <Button onClick={() => this.setState({ modalOK: false })} className="btn_cancel">Cancel</Button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
                <Footer />
            </div>
        );
    }
}

export default BlogDetail;
