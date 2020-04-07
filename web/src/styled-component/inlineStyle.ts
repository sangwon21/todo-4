import * as _ from "lodash/fp";
import { div } from "wonnie-template";

export interface IInlineStyle {
  [key: string]: string;
  display: string;
  "flex-direction": string;
  "flex-wrap": string;
  "justify-content": string;
  "align-items": string;
}

const defaultInlineStyle: IInlineStyle = {
  display: "flex",
  "flex-direction": "row",
  "flex-wrap": "wrap",
  "justify-content": "flex-start",
  "align-items": "center",
};

export const decideStyles = (type: string | void): IInlineStyle => {
  switch (type) {
    case "alignCenter":
      return { ...defaultInlineStyle, "justify-content": "center" };
    case "alignRight":
      return { ...defaultInlineStyle, "justify-content": "flex-end" };
    case "verticalAlignTop":
      return { ...defaultInlineStyle, "align-items": "flex-start" };
    case "verticalAlignBottom":
      return { ...defaultInlineStyle, "align-items": "flex-end" };
    case "columnBase":
      return {
        ...defaultInlineStyle,
        "flex-direction": "column",
        "align-items": "flex-start",
      };
    case "alignCenterColumnBase":
      return {
        ...defaultInlineStyle,
        "flex-direction": "column",
        "align-items": "center",
      };
    case "alignRightColumnBase":
      return {
        ...defaultInlineStyle,
        "flex-direction": "column",
        "align-items": "flex-end",
      };
    case "verticalAlignTopColumnBase":
      return {
        ...defaultInlineStyle,
        "flex-direction": "column",
        "justify-content": "flex-start",
      };
    case "verticalAlignBottomColumnBase":
      return {
        ...defaultInlineStyle,
        "flex-direction": "column",
        "justify-content": "flex-end",
      };

    default:
      return { ...defaultInlineStyle };
  }
  return { ...defaultInlineStyle };
};

export const flattenStyles = (styles: IInlineStyle) => {
  return Object.keys(styles).reduce(
    (acc, cur) => (acc += `${cur}: ${styles[cur]};`),
    ""
  );
};

export const InlineStyle = (style: string) => (
  component: Element | Text | (Element | Text)[]
) => {
  if (Array.isArray(component)) {
    return div({ style })(component);
  }
  return div({ style })([component]);
};

export const makeInlineStyles = _.compose(
  InlineStyle,
  flattenStyles,
  decideStyles
);
