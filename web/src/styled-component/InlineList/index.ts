import * as _ from "lodash/fp";
import { div } from "wonnie-template";
import "./InlineList.scss";

export enum InlineListClass {
  SPACE_BETWEEN = "space-between",
  SPACE_AROUND = "space-around",
  ALIGN_CENTER = "align-center",
  ALIGN_RIGHT = "align-right",
  COLUMN_BASE = "column-base",
  DEFAULT = "default-inline",
  ALIGN_LEFT_COLUMN = "align-left-column-base ",
  ALIGN_LEFT_COLUMN_NO_WRAP = "align-left-column-base-no-wrap",
  ALIGN_CENTER_COLUMN = "align-center-column-base",
  ALIGN_RIGHT_COLUMN = "align-right-column-base",
  SPACE_BETWEEN_COLUMN = "space-between-column-base",
  SPACE_AROUND_COLUMN = "space-around-column-base",
  CENTER = "center",
}

export interface IInlineListAttribute {
  [key: string]: string | Function;
}

export interface IInlineStyle {
  [key: string]:
    | string
    | string[]
    | InlineListClass
    | IInlineListAttribute
    | undefined;
  className: InlineListClass;
  height?: string;
  width?: string;
  userClassList?: string[];
  attributes?: IInlineListAttribute;
}

interface IInlineParam {
  class: string;
  style: string;
  attributes?: IInlineListAttribute;
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
      .filter(
        (key) =>
          key !== "className" && key != "userClassList" && key != "attributes"
      )
      .reduce((acc, cur) => (acc += `${cur}: ${styles[cur]};`), ""),
    class: Object.keys(styles)
      .filter((key) => key === "userClassList" || key === "className")
      .reduce((acc, cur) => {
        if (!styles[cur]) {
          return acc;
        }
        if (cur === "userClassList") {
          return (acc += styles[cur]!.reduce(
            (userClass, curUserClass) => (userClass += ` ${curUserClass} `),
            ""
          ));
        }
        return (acc += `${styles[cur]}`);
      }, ""),
    attributes: styles.attributes,
  };
};

const refineParam = (param: IInlineParam) => {
  let returnObject = { ...param };

  if (returnObject.style === "") {
    delete returnObject.style;
  }
  const { attributes } = returnObject;
  delete returnObject.attributes;

  if (!attributes) {
    return returnObject;
  }
  return { ...returnObject, ...attributes };
};

const makeInlineList = (param: object) => (
  component: Element | Text | (Element | Text)[]
) => {
  if (Array.isArray(component)) {
    return div({ ...param })(component);
  }
  return div({ ...param })([component]);
};

export const InlineList = _.compose(makeInlineList, refineParam, flattenStyles);
