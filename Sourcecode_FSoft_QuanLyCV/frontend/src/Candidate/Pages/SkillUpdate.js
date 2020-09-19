import React, { Component } from "react";

class SkillUpdate extends Component {
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
          <div className="divtext">
            Type of Skill:
            <input
              name="TypeSkill"
              className="boldtext"
              type="text"
              required
              disabled={this.props.disabled}
              onChange={this.onChange}
              value={this.props.TypeSkill || ""}
            />
          </div>
        </div>
        <div className="form-group col-md-1"></div>
        <div className="form-group col-md-5">
          <div className="divtext">
            Skill Name:
            <input
              name="SkillName"
              className="boldtext"
              type="text"
              required
              disabled={this.props.disabled}
              onChange={this.onChange}
              value={this.props.SkillName || ""}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SkillUpdate;
