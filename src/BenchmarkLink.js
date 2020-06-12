// @flow
import * as React from "react";
import { Link } from "./Link";

type Props = {
  id: string | number,
  children: React.Node
};

export function BenchmarkLink(props: Props) {
  return (
    <Link
      target="_blank"
      href={`https://${
        props.id
      }-92570536-gh.circle-artifacts.com/0/~/repo/scripts/benchmarks/dist/index.html`}
    >
      {props.children}
    </Link>
  );
}
