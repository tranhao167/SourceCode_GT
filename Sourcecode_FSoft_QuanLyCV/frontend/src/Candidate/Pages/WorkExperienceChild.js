import React, { Component } from "react";

class WorkExperienceChild extends Component {
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
        <div className="tar" style={{ marginBottom: '2%' }}>
          <button
            type="button"
            className="btn btn-outline-dark btad"
            onClick={() => {
              this.props.addWE(this.props.index);
            }}
          >
            Add
          </button>
          &emsp;
          <button
            type="button"
            className="btn btn-outline-dark btad mr-30"
            onClick={() => {
              this.props.delWE(this.props.index);
            }}
          >
            Delete
          </button>
        </div>
        <div>
          <div className="form-row" style={{ marginLeft: '1px' }}>

            <div className="form-group col-md-6">
              <input
                style={{ height: '80%', width: '90%' }}
                value={this.props.WorkTime || ""}
                onChange={this.onChange}
                name="WorkTime"
                type="text"
                data-tip="Enter the time you had worked at the previous company"
                data-place="bottom"
                data-type="info"
                className="form-control"
                placeholder="Work Time"
                required
              />
            </div>

            <div className="form-group col-md-6">
              <input
                style={{ height: '80%', width: '90%' }}
                value={this.props.WorkPlace || ""}
                onChange={this.onChange}
                name="WorkPlace"
                type="text"
                data-tip="Enter the name of the previous company"
                data-place="bottom"
                data-type="info"
                className="form-control"
                required
                placeholder="Work Place"
              />
            </div>
          </div>

          <div className="form-row" style={{ marginLeft: '1px' }}>

            <div className="form-group col-md-6">

            </div>

            <div className="form-group col-md-6">
              <input
                style={{ height: '80%', width: '90%' }}
                value={this.props.Position || ""}
                onChange={this.onChange}
                name="Position"
                required
                type="text"
                data-tip="Enter the job position in the previous company"
                data-place="bottom"
                data-type="info"
                placeholder="Position"
                className="form-control "
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkExperienceChild;
