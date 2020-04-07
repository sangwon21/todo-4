import * as _ from "lodash/fp";
import { div } from "wonnie-template";

export interface ISpacingStyle {
  [key: string]: number | undefined;
  flex: 1;
  "margin-top": number;
  "margin-left": number;
  "margin-right": number;
  "margin-bottom": number;
}

export interface ISpacingStyleParameter {
  [key: string]: number | undefined;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  unit?: number;
}

export const computeStyles = (
  target: ISpacingStyleParameter | void
): ISpacingStyle => {
  if (target) {
    const unit = target.unit ? target.unit : 1;
    const computedTop = target.top ? target.top * unit : 0;
    const computedBottom = target.bottom ? target.bottom * unit : 0;
    const computedLeft = target.left ? target.left * unit : 0;
    const computedRight = target.right ? target.right * unit : 0;
    return {
      flex: 1,
      "margin-top": computedTop,
      "margin-left": computedLeft,
      "margin-right": computedRight,
      "margin-bottom": computedBottom,
    };
  }

  return {
    flex: 1,
    "margin-top": 1,
    "margin-bottom": 1,
    "margin-right": 1,
    "margin-left": 1,
  };
};

export const flattenStyles = (styles: ISpacingStyle) => {
  return Object.keys(styles).reduce(
    (acc, cur) => (acc += `${cur}: ${styles[cur]}rem;`),
    ""
  );
};

export const SpacingStyle = (style: string) => (
  component: Element | Text | (Element | Text)[]
) => {
  if (Array.isArray(component)) {
    return div({ style })(component);
  }
  return div({ style })([component]);
};

export const makeSpacingStyle = _.compose(
  SpacingStyle,
  flattenStyles,
  computeStyles
);
