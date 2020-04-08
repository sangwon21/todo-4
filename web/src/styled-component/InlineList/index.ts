import * as _ from "lodash/fp";
import { div } from "wonnie-template";
import "./InlineList.scss";

export enum InlineListClass {
  SPACE_BETWEEN = "space-between",
  ALIGN_CENTER = "align-center",
  ALIGN_RIGHT = "align-right",
  COLUMN_BASE = "column-base",
  DEFAULT = "default-inline",
  ALIGN_CENTER_COLUMN = "align-center-column-base",
  ALIGN_RIGHT_COLUMN = "align-right-column-base",
}

export interface IInlineStyle {
  [key: string]: string | InlineListClass | undefined;
  class: InlineListClass;
  height?: string;
  width?: string;
}

interface IInlineParam {
  class: InlineListClass;
  style: string;
}

const defaultInlineStyle: IInlineParam = {
  class: InlineListClass.DEFAULT,
  style: "height: 100%; width: 100%",
};

const flattenStyles = (styles: IInlineStyle | void): IInlineParam => {
  if (!styles) {
    return defaultInlineStyle;
  }
  return {
    style: Object.keys(styles)
      .filter((key) => key !== "class")
      .reduce((acc, cur) => (acc += `${cur}: ${styles[cur]};`), ""),
    class: styles.class,
  };
};

const makeInlineList = (style: IInlineParam) => (
  component: Element | Text | (Element | Text)[]
) => {
  if (Array.isArray(component)) {
    return div({ ...style })(component);
  }
  return div({ ...style })([component]);
};

export const InlineList = _.compose(makeInlineList, flattenStyles);
