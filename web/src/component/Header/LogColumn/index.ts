import { div, i } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { LogColumnCard } from "./LogColumnCard";
import store from "../../../store";
import { ILogColumnCardState } from "./LogColumnCard";

import "./LogColumn.scss";
import { ADD_LOG_HISTORY } from "../../../store/action/logHistory";

interface ILogColumnState {
  logs: ILogColumnCardState[];
}

export class LogColumn {
  private logColumnNode: Element | Text | null = null;
  private logsNode: Element | Text | null = null;
  private state: ILogColumnState;
  constructor(param: ILogColumnState) {
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.update = this.update.bind(this);
    this.deleteAllChildren = this.deleteAllChildren.bind(this);
    this.state = {
      logs: param.logs,
    };
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
    const { history } = store.getState();
    history
      .map((log) =>
        new LogColumnCard({
          userAction: log.userAction,
          contents: log.contents,
          suffix: log.suffix,
          historyCreatedTime: log.historyCreatedTime,
        }).render()
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

    const subHeader = InlineList({
      className: InlineListClass.DEFAULT,
      width: "100%",
    })([bellIcon, div()(["Activity"])]);

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
    })([div()()]);

    this.state.logs
      .map((log) => {
        return new LogColumnCard({
          userAction: log.userAction,
          contents: log.contents,
          suffix: log.suffix,
          historyCreatedTime: log.historyCreatedTime,
        }).render();
      })
      .forEach((logCardElement) => this.logsNode!.appendChild(logCardElement));

    this.state.logs.forEach((log) => {
      store.dispatch({
        type: ADD_LOG_HISTORY,
        userAction: log.userAction,
        contents: log.contents,
        suffix: log.suffix,
        historyCreatedTime: log.historyCreatedTime,
      });
    });

    this.logColumnNode = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["log-column", "log-column-move-right"],
    })([composedHeader, this.logsNode]);

    return this.logColumnNode;
  }
}
