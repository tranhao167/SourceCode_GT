import React, { Component } from "react";

class EducationChild extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (e) => {
    this.props.onChange(this.props.index, e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
          <div className="tar">
                        <button
                          type="button"
                          className="btn btn-outline-dark btad"
                          onClick={()=>{this.props.addEdu(this.props.index)}}
                        >
                          Add
                        </button>
                        &emsp;
                        <button
                          type="button"
                          className="btn btn-outline-dark btad mr-30"
                          onClick={()=>{this.props.delEdu(this.props.index)}}
                        >
                          Delete
                        </button>
                      </div>
        <div>
          <div className="form-row" style={{marginLeft:'1px'}}>
            {/* Date */}
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-6">
                  Startday
                  
                  <input
                  style={{height:'50%'}}
                  value={this.props.Startday  || ""}
                  name="Startday"
                  onChange={this.onChange}
                  type="date"
                  min="2002-01-01"
                  max="2016-31-12"
                  data-tip="Enter the admission date"
                  data-place="bottom"
                  data-type="info"
                  className="form-control"
                  required
                />
                  
                </div>
                <div className="form-group col-md-6">
                  Endday
                  <input
                  style={{height:'50%'}}
                  value={this.props.Endday  || ""}
                  onChange={this.onChange}
                  name="Endday"
                  type="date"
                  min="2016-31-12"
                  max="2020-7-1"
                  data-tip="Enter the graduation date"
                  data-place="bottom"
                  data-type="info"
                  className="form-control"
                  required
                />
                </div>
              </div>
            </div>
            {/* School */}
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-12">
                &emsp;
                  <input
                  style={{height:'50%',width:'90%'}}
                  value={this.props.School }
                  onChange={this.onChange}
                  name="School"
                  type="text"
                  data-tip="Enter your school"
                  data-place="bottom"
                  data-type="info"
                  className="form-control"
                  required
                  placeholder="School"
                />
                  
                </div>
              </div>
            </div>
          </div>


          <div className="form-row" style={{marginLeft:'1px'}}>
          <div className="form-group col-md-6"></div>
            {/* Level Edu */}
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-12">
                <input
                style={{height:'80%',width:'90%'}}
                        value={this.props.LevelEdu }
                        onChange={this.onChange}
                        name="LevelEdu"
                        type="text"
                        data-tip="Enter your Education level"
                        data-place="bottom"
                        data-type="info"
                        className="form-control"
                        required
                        placeholder="Level Education"
                      />
                  
                </div>
              </div>
            </div>
          </div>

          <div className="form-row" style={{marginLeft:'1px'}}>
          <div className="form-group col-md-6"></div>
            {/* Major */}
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-12">
                <input
                style={{height:'80%',width:'90%'}}
                        value={this.props.Major }
                        onChange={this.onChange}
                        name="Major"
                        type="text"
                        data-tip="Enter your Major "
                        data-place="bottom"
                        data-type="info"
                        className="form-control "
                        required="required"
                        placeholder="Major"
                      />
                  
                </div>
              </div>
            </div>
          </div>

          <div className="form-row" style={{marginLeft:'1px'}}>
          <div className="form-group col-md-6"></div>
            {/* GPA */}
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-12">
                <input
                style={{height:'80%',width:'90%'}}
                        value={this.props.GPA }
                        onChange={this.onChange}
                        name="GPA"
                        type="number"
                        data-tip="Enter your GPA "
                        data-place="bottom"
                        data-type="info"
                        placeholder="GPA"
                        max="10"
                        min="0"
                        className="form-control"
                        required="required"
                      />
                  
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default EducationChild;
