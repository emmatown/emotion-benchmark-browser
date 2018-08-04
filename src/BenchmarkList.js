// @flow
/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
import InfiniteScroller from "react-infinite-scroller";
import { Item } from "./Item";
import type { CircleBuildsResult } from "./types";

type State = {
  data: Array<CircleBuildsResult>
};

export class BenchmarkList extends React.Component<{}, State> {
  state = { data: [] };
  render() {
    return (
      <InfiniteScroller
        pageStart={0}
        loadMore={async () => {
          let fetched = await fetch(
            `https://circleci.com/api/v1.1/project/github/emotion-js/emotion/tree/master?offset=${
              this.state.data ? this.state.data.length : 0
            }`
          ).then(data => data.json());
          this.setState(state => ({ data: state.data.concat(fetched) }));
        }}
        threshold={400}
        hasMore={!this.state.data.some(item => !item.workflows)}
        loader={<div key={0}>Loading ...</div>}
      >
        <div>
          {this.state.data
            .filter(
              item =>
                item.workflows &&
                item.workflows.job_name === "flow" &&
                item.branch === "master"
            )
            .map(item => {
              return (
                <div key={item.vcs_revision}>
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
            })}
        </div>
      </InfiniteScroller>
    );
  }
}
