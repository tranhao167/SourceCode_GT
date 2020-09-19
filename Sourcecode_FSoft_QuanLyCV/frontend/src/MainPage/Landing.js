import { Carousel } from "react-responsive-carousel";
import React, { Component } from 'react';
import Axios from "axios";
import { Link } from "react-router-dom";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { array: [] };
    }
    componentDidMount() {
        Axios({
            method: 'GET',
            url: `http://localhost:56058/api/BlogInCarousel`, data: null
        }).then(res => {
            this.setState({
                array: res.data
            })
        })

    }
    render() {
        let Blogs;
        if (this.state.array !== null) {
            Blogs = this.state.array.map(arr => (
                <div key={arr.BlogID} className="banner_part">
                    <img alt="" style={{ height: '100%' }} src={arr.ImageMain} />
                    <div className="textpos">
                        <h1>{arr.Subject}</h1>
                        <p>{arr.Description}</p><br />
                        <Link to={"/" + arr.BlogID + "/FeatureArticle"}><p className="btn_carousel" style={{width:'14%'}}><i className="far fa-bookmark fa-1x"></i> READ MORE</p></Link>
                    </div>
                </div>
            ));
        }
        return (
            <div >
                <Carousel className="slider-container" showArrows={true} infiniteLoop={true} showThumbs={false} autoPlay transitionTime='500' dynamicHeight={true} showStatus={false}>
                    {Blogs}
                </Carousel>
            </div>


        );
    }
}

export default Landing;