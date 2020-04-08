import { div, i, span } from "wonnie-template";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";

import "./card.scss";

const rightHeader = InlineList({ class: InlineListClass.DEFAULT })([
  i({ class: "tasks icon" })(),
  div({ class: "card-title" })(["페이지네이션 UI 리서치"]),
]);

const closeButton = div()([i({ class: "close icon" })()]);

const header = InlineList({
  class: InlineListClass.SPACE_BETWEEN,
  width: "100%",
})([rightHeader, closeButton]);

const footer = InlineList({ class: InlineListClass.DEFAULT })([
  span({ class: "card-prefix" })(["Added by"]),
  span({ class: "card-author" })(["nigayo"]),
]);

export const Card = InlineList({
  class: InlineListClass.SPACE_BETWEEN_COLUMN,
  userClassList: ["card"],
})([header, footer]);
