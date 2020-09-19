import React, { Component } from 'react';
import ModalNotsignin from './ModalNotsignin';
import Landing from './Landing';
import "react-responsive-carousel/lib/styles/carousel.min.css"

class Section extends Component {
  constructor(props){
    super(props);
    this.state={
      notsignin:false
    }
  }
  onNotsign=()=>{
    this.setState({
      notsignin:true
    })

  }
    render() {
      let addModalClose=()=>this.setState({notsignin:false});
        return (
           
      <section className="banner_part">
      <div className="carousel">
        <div className="row align-items-center">
          <div className="col-lg-12">
          <Landing/>
          <img alt='' src="../Image/Capture.PNG"/>
          </div>
        </div>
      </div>
      <ModalNotsignin
            isOpen={this.state.notsignin}
            onHide={addModalClose}
            />
    </section>
        );
    }
}

export default Section;
