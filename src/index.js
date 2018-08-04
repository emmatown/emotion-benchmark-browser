// @flow
/** @jsx jsx */
import { jsx } from "@emotion/core";
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
          color: "#c0f"
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
