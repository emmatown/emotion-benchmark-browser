/** @jsx jsx */
import { jsx } from "@emotion/core";
import InfiniteScroller from "react-infinite-scroller";
import { State } from "./State";
import { Item } from "./Item";

export function BenchmarkList() {
  return (
    <State initial={{ data: [], renderAll: true, hasMore: true }}>
      {({ state, setState }) => {
        return (
          <InfiniteScroller
            pageStart={0}
            loadMore={async () => {
              let fetched = await fetch(
                `https://circleci.com/api/v1.1/project/github/emotion-js/emotion/tree/master?offset=${
                  state.data ? state.data.length : 0
                }`
              ).then(data => data.json());
              setState(state => ({ data: state.data.concat(fetched) }));
            }}
            threshold={400}
            hasMore={!state.data.some(item => !item.workflows)}
            loader={<div key={0}>Loading ...</div>}
          >
            <div>
              {state.data
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
      }}
    </State>
  );
}
