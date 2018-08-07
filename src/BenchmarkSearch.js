// @flow
/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { BenchmarkLink } from "./BenchmarkLink";

type Props = {};

type State = {
  value: string,
  id: null | string,
  error: boolean,
  disabled: boolean
};

export class BenchmarkSearch extends React.Component<Props, State> {
  state = {
    value: "",
    id: null,
    error: false,
    disabled: false
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            onChange={event => {
              this.setState({ value: event.target.value });
            }}
            placeholder="Commit SHA"
          />
          <button type="submit" disabled={this.state.disabled}>
            Find benchmark
          </button>
        </form>
        {this.state.error && <div>Something went wrong.😢</div>}
        {this.state.id && (
          <BenchmarkLink id={this.state.id}>#{this.state.id}</BenchmarkLink>
        )}
      </div>
    );
  }
  onSubmit = async (event: Event) => {
    event.preventDefault();
    this.setState({
      disabled: true,
      error: false,
      value: "",
      id: null
    });
    let commitStatuses = await fetch(
      `https://api.github.com/repos/emotion-js/emotion/commits/${encodeURIComponent(
        this.state.value.trim()
      )}/statuses`
    ).then(x => x.json());
    this.setState({ disabled: false });
    if (!Array.isArray(commitStatuses)) {
      this.setState({ error: true });
    }
    let circleCiTest = commitStatuses.find(
      item => item.context === "ci/circleci: flow"
    );
    let res = /(\d+)/.exec(circleCiTest.target_url);
    if (res === null) {
      return this.setState({ error: true });
    }
    this.setState({
      id: res[0]
    });
  };
}
