import * as React from "react";

export class State extends React.Component {
  state = this.props.initial || {};
  render() {
    return this.props.children({
      state: this.state,
      setState: this.setState.bind(this)
    });
  }
}
