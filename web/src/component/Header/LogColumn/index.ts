import { div, i } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { LogColumnCard } from "./LogColumnCard";
import store from "../../../store";

import "./LogColumn.scss";

export class LogColumn {
  private logColumnNode: Element | Text | null = null;
  private logsNode: Element | Text | null = null;
  constructor() {
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.update = this.update.bind(this);
    this.deleteAllChildren = this.deleteAllChildren.bind(this);
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

  deleteAllChildren() {
    let currentNode = (this.logsNode as Element).firstElementChild;
    while (currentNode) {
      currentNode.remove();
      currentNode = (this.logsNode as Element).firstElementChild;
    }
  }

  update() {
    this.deleteAllChildren();
    const currentStatus = store.getState().history;
    console.log(currentStatus);
    console.log(this.logsNode);
    currentStatus
      .map((log) =>
        new LogColumnCard({ fromDate: "2020-04-15T18:13:34.247", log }).render()
      )
      .reverse()
      .forEach((logColmun) => {
        this.logsNode!.appendChild(logColmun);
      });
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

    this.logsNode = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN_NO_WRAP,
      width: "100%",
      height: "90%",
      userClassList: ["log-column-log-wrapper"],
    })(
      new LogColumnCard({
        log: "hello",
        fromDate: "2020-04-15T14:05:34.247",
      }).render()
    );

    this.logColumnNode = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["log-column", "log-column-move-right"],
    })([composedHeader, this.logsNode]);

    return this.logColumnNode;
  }
}
