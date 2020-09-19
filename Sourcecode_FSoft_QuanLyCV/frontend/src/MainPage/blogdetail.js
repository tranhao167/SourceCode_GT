import React, { Component } from 'react';
import TopMenu from './TopMenu';
import Footer from './Footer';
import Axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

class blogdetail extends Component {
    constructor(props) {
        super(props);
        this.state = { contentblog: '', Image: '',subject:'', arrays: [], BlogID: '' };
    }

    
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var BlogID = match.params.id;
            this.findBlog(BlogID)
        }
        //Article
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/BlogCreate`, data: null
        }).then(res => {
            this.setState({
                arrays: res.data.paginationMetadata.data
            })

        })

    }
    findBlog = async (blogid) => {
        let response = await fetch(`http://localhost:56058/api/DetailBlog?id=${blogid}`, {
            method: 'GET'
        });

        const data = await response.json();
        this.setState({
            contentblog: data.ContentBlog,
            Image: data.ImageMain,
            subject:data.Subject
        });
    }
    render() {
        let arrays;
        if (this.state.arrays !== null) {
            arrays = this.state.arrays.map(array => (
                <div key={array.BlogID} style={{ borderRadius: "10px", border: '0', boxShadow: '5px 10px 18px #888888', fontSize: '18px', marginBottom: '2%' }}>
                    <img alt='' src={array.ImageMain} style={{ borderRadius: '10px' }} />
                    <Link to="#" onClick={() => this.findBlog(array.BlogID)} className='boldtext' style={{ textAlign: 'center' }}>{array.Subject}</Link>
                </div>
            ))
        }
        return (
            <div>
                <div className='Employer_font'>
                    <TopMenu />
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ paddingBottom: '1%', marginTop: '3%', fontSize: '18px' }}>
                        <div className="form-group row">
                            <div className="col-sm-3" >
                                {arrays}
                            </div>
                            <div className="col-sm-9">
                                <div style={{borderRadius: "10px", boxShadow: '5px 10px 18px #888888', fontSize: '18px', padding: '2%' }}>
                                    <div >
                                        <img alt='' src={this.state.Image} style={{ borderRadius: '10px',marginBottom:'3%' }} />
                                    </div>
                                    <div style={{textAlign:'center',fontSize:"50px",fontWeight:'bold',marginBottom:'2%'}}>
                                        {this.state.subject}
                                    </div>
                                    <div style={{border:'1px solid',padding:'1%'}}>
                                        {parse(this.state.contentblog)}
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Footer />
            </div>
        );
    }
}

export default blogdetail;
