import React, { Component } from "react";
//import ChildComponent from './WorkExperienceChild'

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [{
        txtname:""
      }]
    }
  }
addComp = (index) => {
  this.setState({
    array : (this.state.array.slice(0,index + 1).concat([{}])).concat(this.state.array.slice(index +1))
  })
}
delComp = (index) => {
  this.setState({
    array : this.state.array.slice(0,index).concat(this.state.array.slice(index + 1))
  })
}

handleChange = (index,field,value)=>{
  var array = this.state.array;
  array[index][field] = value
  this.setState({
    array : array
  })
}


  render() {
    return (
      <div className="">
          {/* {this.state.array.map((child,index)=>{
            return(
              <ChildComponent
                key={index}
                index={index}
                txtname={child.txtname}
                addComp={this.addComp}
                delComp={this.delComp}
                onChange={this.handleChange}
              ></ChildComponent>
            )
          })}
        */}
      </div>
    );
  }
}

export default Test;
