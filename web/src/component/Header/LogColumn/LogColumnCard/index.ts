import { div, img, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../../styled-component/InlineList";
import yein from "./yein.jpg";
import { dateDiff } from "../../../../util/date";

import "./LogColumnCard.scss";

interface ILogColumnCardState {
  userAction: string;
  contents: string;
  suffix?: string;
  fromDate: string;
}

export class LogColumnCard {
  private state: ILogColumnCardState;
  constructor(props: ILogColumnCardState) {
    this.state = {
      userAction: props.userAction,
      contents: props.contents,
      suffix: props.suffix,
      fromDate: props.fromDate,
    };
  }
  render() {
    const imgElement = div()([
      img({ src: yein, class: "log-column-card-img" })(),
    ]);

    const idText = span({ class: "log-column-text log-column-id" })([
      "@nigayo ",
    ]);
    const actionText = span({ class: "log-column-text" })([
      this.state.userAction,
    ]);
    const suffixText = span({ class: "log-column-text" })([
      this.state.suffix
        ? `${this.state.contents} ${this.state.suffix}`
        : this.state.contents,
    ]);

    const texts = div({ class: "log-column-texts" })([
      idText,
      actionText,
      suffixText,
    ]);

    const title = div({ class: "log-column-card-title" })([texts]);

    const footer = span({ class: "log-column-card-time" })([
      dateDiff(new Date(this.state.fromDate), new Date()),
    ]);

    const contents = InlineList({
      className: InlineListClass.SPACE_AROUND_COLUMN,
      userClassList: ["log-column-card-contents"],
      height: "100%",
    })([title, footer]);

    return InlineList({
      className: InlineListClass.DEFAULT_NO_WRAP,
      userClassList: ["log-column-card"],
      height: "4.5rem",
      width: "100%",
    })([imgElement, contents]);
  }
}
