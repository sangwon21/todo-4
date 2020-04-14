import { div, img, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../../styled-component/InlineList";

import * as imgSrc from "./yein.jpg";

import "./LogColumnCard.scss";

const imgElement = () =>
  div()([img({ src: imgSrc, class: "log-column-card-img" })()]);
const title = () =>
  div({ class: "log-column-card-title" })(["@nigayo moved the column"]);
const footer = () =>
  span({ class: "log-column-card-time" })(["38 minutes ago"]);

const contents = () =>
  InlineList({
    className: InlineListClass.SPACE_AROUND_COLUMN,
    userClassList: ["log-column-card-contents"],
    height: "100%",
  })([title(), footer()]);

export const LogColumnCard = () =>
  InlineList({
    className: InlineListClass.DEFAULT,
    userClassList: ["log-column-card"],
    height: "4.5rem",
    width: "100%",
  })([imgElement(), contents()]);
