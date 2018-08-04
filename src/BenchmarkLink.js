import * as React from "react";
import { Link } from "./Link";

export function BenchmarkLink(props: { id: string, children: React.Node }) {
  return (
    <Link
      target="_blank"
      href={`https://${
        props.id
      }-92570536-gh.circle-artifacts.com/0/home/circleci/repo/scripts/benchmarks/dist/index.html`}
    >
      {props.children}
    </Link>
  );
}
