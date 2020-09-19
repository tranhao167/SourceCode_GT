import React, { Component } from "react";

class WEUpdate extends Component {
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
        <div className="form-row" style={{ marginLeft: "1px" }}>
          <div className="form-group col-md-6">
            <div className="divtext">
              Work Time:
              <input
                name="WorkTime"
                className="boldtext"
                type="text"
                required
                onChange={this.onChange}
                disabled={this.props.disabled}
                value={this.props.WorkTime || ""}
              />
            </div>
          </div>
          <div className="form-group col-md-6">
            <div className="divtext">
              Work Place:
              <input
                name="WorkPlace"
                className="boldtext"
                type="text"
                required
                disabled={this.props.disabled}
                onChange={this.onChange}
                value={this.props.WorkPlace || ""}
              />
            </div>
          </div>
        </div>
        <div className="form-row" style={{ marginLeft: "1px" }}>
          <div className="form-group col-md-6"></div>
          <div className="form-group col-md-6">
            <div className="divtext">
              Position:
              <input
                name="Position"
                className="boldtext"
                type="text"
                required
                disabled={this.props.disabled}
                onChange={this.onChange}
                value={this.props.Position || ""}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WEUpdate;
