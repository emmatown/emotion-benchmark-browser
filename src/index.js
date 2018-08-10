// @flow
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "intersection-observer";
import ReactDOM from "react-dom";
import "./styles.css";
import { BenchmarkList } from "./BenchmarkList";
import { BenchmarkSearch } from "./BenchmarkSearch";

function App() {
  return (
    <div
      css={{
        padding: 12
      }}
    >
      <h1
        css={{
          color: "#ff2ad7"
        }}
      >
        Emotion Benchmarks
      </h1>
      <BenchmarkSearch />
      <BenchmarkList />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("could not find root");
}
ReactDOM.render(<App />, rootElement);
