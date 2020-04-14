import { div, i } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { LogColumnCard } from "./LogColumnCard";

import "./LogColumn.scss";

const rightHeader = InlineList({
  className: InlineListClass.DEFAULT,
  width: "80%",
})([i({ class: "tasks icon" })(["Menu"])]);

const closeButton = div({})([i({ class: "close icon" })()]);

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
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
  LogColumnCard(),
]);

export const LogColumn = InlineList({
  className: InlineListClass.ALIGN_LEFT_COLUMN,
  userClassList: ["log-column"],
})([composedHeader, logs]);
