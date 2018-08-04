/** @jsx jsx */
import { jsx } from "@emotion/core";
import { State } from "./State";

export function BenchmarkSearch() {
  return (
    <State initial={{ value: "", id: null, error: false, disabled: false }}>
      {({ state, setState }) => {
        return (
          <div>
            <form
              onSubmit={async e => {
                e.preventDefault();
                setState({
                  disabled: true,
                  error: false,
                  value: "",
                  id: null
                });
                let commitStatuses = await fetch(
                  `https://api.github.com/repos/emotion-js/emotion/commits/${encodeURIComponent(
                    state.value.trim()
                  )}/statuses`
                ).then(x => x.json());
                setState({ disabled: false });
                if (!Array.isArray(commitStatuses)) {
                  setState({ error: true });
                }
                let circleCiTest = commitStatuses.find(
                  item => item.context === "ci/circleci: test"
                );
                setState({
                  id: /(\d+)/.exec(circleCiTest.target_url)[0]
                });
              }}
            >
              <input
                value={state.value}
                onChange={event => {
                  setState({ value: event.target.value });
                }}
                placeholder="Commit SHA"
              />
              <button type="submit" disabled={state.disabled}>
                Find benchmark
              </button>
            </form>
            {state.error && <div>Something went wrong.😢</div>}
            {state.id && (
              <BenchmarkLink id={state.id}>#{state.id}</BenchmarkLink>
            )}
          </div>
        );
      }}
    </State>
  );
}
