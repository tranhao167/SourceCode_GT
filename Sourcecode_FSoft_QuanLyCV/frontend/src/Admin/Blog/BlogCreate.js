import React, { Component } from 'react';
import Menuadmin from '../Menuadmin';
import Footer from '../../MainPage/Footer';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Redirect } from 'react-router-dom';
import { Button, Modal, ModalBody } from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';

class BlogCreate extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("auth-jwt");
        let loggedIn = true;
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            loggedIn, loading: false,
            Subject: '',
            Status: '',
            ImageMain: '',
            ContentBlog: '',
            Description: '',
            disabled: true,
            open: false,
            edit: false,
            disableforOK: true,
            modalok: false,
            selectedfile: '',
            setImage: '',
            accname: JSON.parse(localStorage.getItem("auth-jwt")).getacc,
            adminID: '', back: false
        }
    }
    componentDidMount() {
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
            [e.target.name]: e.target.value,
            edit: true
        })
    }
    onImageChange = (e) => {
        this.setState({
            selectedfile: e.target.files[0],
            ImageMain: URL.createObjectURL(e.target.files[0])
        })
    }
    openText = (e) => {
        e.preventDefault();
        this.setState({
            modalok: true
        })

    }
    changeRadio=(e)=>{
        if (e.target.checked) {
            this.setState({
              Status: e.target.value,
              edit:true
            })
          }
    }
    onSave = () => {
        Axios({
            method: 'POST',
            url: `http://localhost:56058/api/DetailBlog`,
            data: {
                AdminID: this.state.adminID,
                Subject: this.state.Subject,
                ImageMain: this.state.setImage,
                Status: this.state.Status,
                ContentBlog: this.state.ContentBlog,
                Description: this.state.Description,
                CreatedBy: this.state.accname
            }
        }).then(res => {
            toast.success("Created Successfully!")
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
                console.log(response)
                this.setState({
                    setImage: response.data.url,
                    setLoading: false,
                });
                if (response.status === 200) {
                    this.onSave()


                } else {
                    alert("ERROR");

                }

            }).catch(err => {
                alert(err)
                setTimeout(() => {
                    this.setState({
                        loading: false
                    });
                }, 100000)
            });
    }
    render() {
        if (this.state.back) {
            return <Redirect to="/admin/blogmanagement" />
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/admin/login" />
        }
        let check = null;
        if (this.state.edit === false) {
            check = (<Button type="submit" className="btn_accept" disabled={this.state.disableforOK}>OK</Button>);
        } else {
            check = (<Button type="submit" className="btn_accept">OK</Button>)
        }
        return (
            <div>
                <div className="Employer_font">
                    <Menuadmin />

                    <div className="container" style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', paddingBottom: '1%', marginTop: '3%' }}>
                        <form onSubmit={this.openText}>
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
                                            required
                                        />

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
                                        value={this.state.Subject}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <div className="divtext">DESCRIPTION</div>
                                </div>
                                <div className="form-group col-md-12">
                                    <textarea type="text" className="form-control"
                                        name="Description"
                                        value={this.state.Description}
                                        onChange={this.onChange}
                                        required
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
                                        onInit={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            this.setState({
                                                ContentBlog: data
                                            })
                                        }}
                                    />

                                </div>
                               
                            </div>
                            <div className="form-row">
                                    <div className="form-group col-md-5">
                                        <div className="divtext">PUT THIS ARTICLE ON THE CAROUSEL</div>
                                    </div>
                                    <div className="form-group col-md-7">
                                        <div className="checkbox">
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
                                                <input type="radio"
                                                    onChange={this.changeRadio}
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
                                <Button type="reset" className="btn_reset">BACK</Button>
                            </div>
                        </form>
                    </div>
                    <Modal
                        {...this.props}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        isOpen={this.state.modalok}
                    >
                        <ModalBody>
                            <p className="boldtext" style={{ textAlign: 'center', paddingBottom: '5%', paddingTop: '5%' }}>Would you like to create this Article?</p>
                            <div className="form-row" style={{ textAlign: 'center' }}>

                                <div className="form-group col-md-12">
                                    <Button className="btn_OK" onClick={() => this.upLoad()} disabled={this.state.loading}>{this.state.loading && <i className="fa fa-refresh fa-spin"></i>}OK</Button>
                                    <Button onClick={() => this.setState({ modalok: false })} className="btn_cancel">Cancel</Button>
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

export default BlogCreate;
