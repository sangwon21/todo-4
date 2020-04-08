import { div, i } from "wonnie-template";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";
import { Spacing } from "../../styled-component/Spacing";
import { AddingCard } from "../AddingCard";
import { Card } from "../Card";

import "./Table.scss";

export const numberCircle = div({ class: "number-circle" })([3]);

export const about = Spacing({ left: 0.4 })(
  div({ class: "table-about" })(["해야할일"])
);

export const plusIcon = i({ class: "plus icon" })();

export const horizontalIcon = i({ class: "ellipsis horizontal icon" })();

export const leftSide = InlineList({ class: InlineListClass.DEFAULT })([
  numberCircle,
  about,
]);
export const rightSide = InlineList({ class: InlineListClass.DEFAULT })([
  plusIcon,
  horizontalIcon,
]);

export const header = InlineList({ class: InlineListClass.SPACE_BETWEEN })([
  leftSide,
  rightSide,
]);

const card = Card;

export const Table = div({ class: "table" })([header, AddingCard, Card, card]);
