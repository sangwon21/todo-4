import { div, i } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { LogColumnCard } from "./LogColumnCard";

import "./LogColumn.scss";

export class LogColumn {
  private logColumnNode: Element | Text | null = null;
  constructor() {
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  moveLeft() {
    const { classList } = this.logColumnNode as Element;
    classList.remove("animation-move-left");
    classList.add("animation-move-right");
  }

  moveRight() {
    const { classList } = this.logColumnNode as Element;
    classList.remove("animation-move-right");
    classList.add("animation-move-left");
  }

  render() {
    const menu = div({ class: "log-column-menu-text" })(["Menu"]);
    const rightHeader = InlineList({
      className: InlineListClass.DEFAULT,
      width: "80%",
    })([i({ class: "tasks icon" })(), menu]);

    const closeButton = div({})([
      i({ class: "close icon", onClick: this.moveRight })(),
    ]);

    const header = InlineList({
      className: InlineListClass.SPACE_BETWEEN,
      width: "100%",
    })([rightHeader, closeButton]);

    const bellIcon = div()([i({ class: "bell icon" })()]);
    const activity = div()(["Activity"]);

    const subHeader = InlineList({
      className: InlineListClass.DEFAULT,
      width: "100%",
    })([bellIcon, activity]);

    const composedHeader = InlineList({
      className: InlineListClass.SPACE_AROUND_COLUMN,
      width: "100%",
      height: "10%",
    })([header, subHeader]);

    const logs = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN_NO_WRAP,
      width: "100%",
      height: "90%",
      userClassList: ["log-column-log-wrapper"],
    })([
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
      new LogColumnCard().render(),
    ]);

    this.logColumnNode = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["log-column", "log-column-move-right"],
    })([composedHeader, logs]);

    return this.logColumnNode;
  }
}
