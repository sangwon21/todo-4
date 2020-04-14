import { div, header } from "wonnie-template";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";
import {
  Spacing,
  ISpacingStyleParameter,
} from "../../styled-component/Spacing";
import { LogColumn } from "./LogColumn";

import "./Header.scss";

const leftMargin: ISpacingStyleParameter = {
  left: 2,
};

const service = Spacing(leftMargin)(
  div({
    style: "font-size: 2rem;",
    class: "header-content header-content-todo",
  })(["TODO 서비스"])
);
const menu = div({
  style: "text-align: right; position: relative;",
  class: "header-content header-content-menu",
})(["menu", LogColumn]);

export const Header = header({
  style: "background-color: #000000; height: 4rem; font-size: 1rem;",
})([
  InlineList({
    className: InlineListClass.SPACE_BETWEEN,
    height: "100%",
    userClassList: ["header"],
  })([service, menu]),
]);
