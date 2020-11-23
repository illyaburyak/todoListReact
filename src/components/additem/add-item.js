import React, { Component } from "react";

export default class Additem extends Component {
  state = {
    text: ''
  };

  onChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.text);
    this.setState({
      text: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          type="text"
          placeholder="type here"
          value={this.state.text}
        />
        <button>Add Item</button>
      </form>
    );
  }
}
