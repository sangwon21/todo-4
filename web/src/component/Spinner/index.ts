import { div } from "wonnie-template";
import * as _ from "lodash/fp";

import "./Spinner.scss";

export enum SpinnerSize {
  LARGE = "5rem",
  MEDIUM = "3rem",
  SMALL = "1rem",
}

const refineSizeStyle = (size: SpinnerSize) => {
  return `height: ${size}; width: ${size};`;
};

const makeSpinner = (style: string) =>
  div({
    id: "loading",
    style,
  })([]);

export const Spinner = _.compose(makeSpinner, refineSizeStyle);
