import * as React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BenchmarkLink } from "./BenchmarkLink";
import { Link } from "./Link";

export function Item(item) {
  return (
    <React.Fragment>
      <details
        css={{
          color: "hotpink"
        }}
      >
        <summary
          css={{
            listStyle: "none",
            "::-webkit-details-marker": {
              display: "none"
            },
            "::before": {
              content: "'👉'",
              paddingRight: 4
            },
            "details[open] &::before": {
              content: "'👇'"
            }
          }}
        >
          <h3
            css={{
              fontWeight: "normal",
              marginBottom: 4,
              marginTop: 0,
              display: "inline"
            }}
          >
            <BenchmarkLink id={item.build_num}>{item.subject}</BenchmarkLink>
          </h3>
        </summary>
        <pre>{item.body}</pre>
      </details>

      <span>
        <Link
          href={`https://github.com/emotion-js/emotion/tree/${item.branch}`}
        >
          {item.branch}
        </Link>
        <span css={{ color: "#c0f" }}> - </span>
        <Link
          href={`https://github.com/emotion-js/emotion/commit/${
            item.vcs_revision
          }`}
        >
          {item.vcs_revision.substring(0, 7)}
        </Link>
      </span>
    </React.Fragment>
  );
}
