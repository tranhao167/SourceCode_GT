import React, { Component } from "react";

class SkillChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
              this.props.addSkill(this.props.index);
            }}
          >
            Add
          </button>
          &emsp;
          <button
            type="button"
            className="btn btn-outline-dark btad mr-30"
            onClick={() => {
              this.props.delSkill(this.props.index);
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
                value={this.props.TypeSkill || ""}
                onChange={this.onChange}
                name="TypeSkill"
                type="text"
                data-tip="Enter the type of skill you have"
                data-place="bottom"
                data-type="info"
                placeholder="Type of skill"
                required
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6">
              <input style={{ height: '80%', width: '90%' }}
                value={this.props.SkillName || ""}
                onChange={this.onChange}
                name="SkillName"
                type="text"
                data-tip="Enter the skill name you have"
                data-place="bottom"
                data-type="info"
                className="form-control"
                required
                placeholder="Skill Name"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillChild;
