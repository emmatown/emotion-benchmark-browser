// @flow
/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import { Item } from "./Item";
import type { CircleBuildsResult } from "./types";
import Select, { components } from "react-select";
import { alpha } from "color-fns";
import Observer from "@researchgate/react-intersection-observer";
type State = {
  data: Array<CircleBuildsResult>
};

let cache = {};

let fetchData = (branch: string, offset: number) => {
  let cacheKey = branch + ":" + offset;
  if (cache[cacheKey] === undefined) {
    return fetch(
      `https://circleci.com/api/v1.1/project/github/emotion-js/emotion/tree/${branch}?offset=${offset}`
    )
      .then(x => x.json())
      .then(val => {
        cache[cacheKey] = val;
        return val;
      });
  }
  return cache[cacheKey];
};

let selectComponents = {
  DropdownIndicator: props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          👇
        </components.DropdownIndicator>
      )
    );
  }
};

let selectStyles = {
  control: (base, state) => {
    return {
      ...base,
      boxShadow: state.isFocused ? `0 0 0 1px ${primary}` : null,
      borderColor: state.isFocused ? primary : "hsl(0,0%,80%)",
      ":hover": {
        borderColor: primary
      }
    };
  }
};

let primary = "#ff2ad7";

export class BenchmarkList extends React.Component<{}, State> {
  state = {
    data: [],
    branch: { value: "master", label: "master" },
    branches: [{ value: "master", label: "master" }],
    fetching: false
  };
  componentDidMount() {
    this.getBranches();
    this.getInitialData();
  }
  async getBranches() {
    let branches = (await fetch(
      "https://api.github.com/repos/emotion-js/emotion/branches?per_page=100"
    ).then(x => x.json())).map(x => ({
      value: x.name,
      label: x.name
    }));
    this.setState({ branches });
  }
  async getInitialData() {
    this.setState({ fetching: true });
    let data = await fetchData(this.state.branch.value, this.state.data.length);
    this.setState(state => ({
      data: state.data.concat(data),
      fetching: false
    }));
  }

  onObserverChange = async event => {
    if (!event.isIntersecting || this.state.fetching) {
      return;
    }
    this.setState({ fetching: true });
    let data = await fetchData(this.state.branch.value, this.state.data.length);
    this.setState(state => ({
      data: state.data.concat(data),
      fetching: false
    }));
  };
  render() {
    let filteredData = this.state.data.filter(
      item => item.workflows && item.workflows.job_name === "flow"
    );
    return (
      <div>
        <Select
          css={{
            paddingTop: 12,
            paddingBottom: 4
          }}
          classNamePrefix="react-select"
          styles={selectStyles}
          components={selectComponents}
          value={this.state.branch}
          onChange={val => {
            this.setState({ branch: val, data: [], hasFetched: false }, () => {
              this.getInitialData();
            });
          }}
          options={this.state.branches}
        />

        <div>
          {filteredData.map((item, i) => {
            let ele = (
              <div key={i}>
                <hr
                  css={{
                    color: "#c0f",
                    borderStyle: "solid",
                    borderRadius: 4,
                    borderWidth: 3
                  }}
                />
                <Item {...item} />
              </div>
            );
            if (i === filteredData.length - 2) {
              return (
                <Observer
                  key={i}
                  threshold={0.25}
                  onChange={this.onObserverChange}
                >
                  {ele}
                </Observer>
              );
            }
            return ele;
          })}
          {this.state.fetching && (
            <div
              css={{
                textAlign: "center",
                padding: 8
              }}
            >
              Loading...
            </div>
          )}
        </div>
      </div>
    );
  }
}
