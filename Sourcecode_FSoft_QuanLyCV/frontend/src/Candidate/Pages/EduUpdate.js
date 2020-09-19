import React, { Component } from "react";

class EduUpdate extends Component {
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
      <div className="form-row">
        <div className="form-group col-md-5" style={{ marginLeft: "1%" }}>
          {/* ...................... */}
          <div style={{ fontSize: "17px" }}>
            <input
              style={{ width: "160px" }}
              className="boldtext"
              type="date"
              name="Startday"
              required
              disabled={this.props.disabled}
              onChange={this.onChange}
              value={this.props.Startday}
            />
            &nbsp;To &nbsp;
            <input
              style={{ width: "160px" }}
              className="boldtext"
              type="date"
              name="Endday"
              required
              format="YYYY/MM/DD"
              disabled={this.props.disabled}
              onChange={this.onChange}
              value={this.props.Endday}
            />
          </div>
        </div>
        <div className="form-group col-md-1"></div>
        <div className="form-group col-md-5">
          <div>
            <label className="divtext" style={{ width: "50px" }}>
              School:
            </label>{" "}
            <input
            name="School"
              className="boldtext"
              type="text"
              disabled={this.props.disabled}
              onChange={this.onChange}
              required
              value={this.props.School ||""}
            />
          </div>
          <div>
            <label className="divtext" style={{ width: "50px" }}>
              Level:
            </label>{" "}
            <input
              className="boldtext"
              type="text"
              name="LevelEdu"
              disabled={this.props.disabled}
              onChange={this.onChange}
              required
              value={this.props.LevelEdu}
            />
          </div>
          <div>
            <label className="divtext" style={{ width: "50px" }}>
              Major:
            </label>{" "}
            <input
              className="boldtext"
              type="text"
              name="Major"
              disabled={this.props.disabled}
              onChange={this.onChange}
              required
              value={this.props.Major}
            />
          </div>
          <div>
            <label className="divtext" style={{ width: "54px" }}>
              GPA:
            </label>
            <input
              className="boldtext"
              type="number"
              required
              min='0'
              max='10'
              step='0.1'  
              name="GPA"
              disabled={this.props.disabled}
              onChange={this.onChange}
              value={this.props.GPA}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EduUpdate;
