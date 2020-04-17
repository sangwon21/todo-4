import { div, header } from "wonnie-template";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";
import {
  Spacing,
  ISpacingStyleParameter,
} from "../../styled-component/Spacing";
import { LogColumn } from "./LogColumn";
import store from "../../store";
import { ILogColumnCardState } from "./LogColumn/LogColumnCard";

import "./Header.scss";

export class Header {
  private logColumn: LogColumn;
  constructor(param: ILogColumnCardState[]) {
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.logColumn = new LogColumn({ logs: param });
    store.subscribe(this.logColumn.update);
  }

  handleMenuClick() {
    this.logColumn.moveLeft();
  }

  render() {
    const leftMargin: ISpacingStyleParameter = {
      left: 2,
    };

    const rightMargin: ISpacingStyleParameter = {
      right: 2,
    };

    const service = Spacing(leftMargin)(
      div({
        style: "font-size: 2rem;",
        class: "header-content header-content-todo",
      })(["TODO 서비스"])
    );

    const menu = Spacing(rightMargin)(
      div({
        style: "text-align: right; position: relative;",
        class: "header-content header-content-menu",
        onClick: this.handleMenuClick,
      })(["menu"])
    );

    return header({
      style: "background-color: #000000; height: 4rem; font-size: 1rem;",
    })([
      InlineList({
        className: InlineListClass.SPACE_BETWEEN,
        height: "100%",
        userClassList: ["header"],
      })([service, menu, this.logColumn.render()]),
    ]);
  }
}
