/** @jsx jsx */
import { jsx } from "@emotion/core";

export let Link = props => {
  return (
    <a
      rel={props.target === "_blank" ? "noopener" : undefined}
      css={{
        color: "hotpink",
        ":visited": {
          color: "#ff2ad7"
        },
        ":hover": { color: "" },
        textDecoration: "none",
        borderBottom: "currentColor dotted 2px"
      }}
      {...props}
    />
  );
};
