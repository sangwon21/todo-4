import { div, i, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";

import "./card.scss";

export class Card {
  private contents: string;
  private cardNode: Element | Text | null;
  constructor(contents: string) {
    this.contents = contents;
    this.cardNode = null;
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
  }

  closeButtonHandler() {
    this.cardNode && this.cardNode.remove();
  }

  render() {
    const rightHeader = InlineList({ class: InlineListClass.DEFAULT })([
      i({ class: "tasks icon" })(),
      div({ class: "card-title" })([this.contents]),
    ]);

    const closeButton = div({ onClick: this.closeButtonHandler })([
      i({ class: "close icon" })(),
    ]);

    const header = InlineList({
      class: InlineListClass.SPACE_BETWEEN,
      width: "100%",
    })([rightHeader, closeButton]);

    const footer = InlineList({ class: InlineListClass.DEFAULT })([
      span({ class: "card-prefix" })(["Added by"]),
      span({ class: "card-author" })(["nigayo"]),
    ]);

    this.cardNode = InlineList({
      class: InlineListClass.SPACE_BETWEEN_COLUMN,
      userClassList: ["card"],
    })([header, footer]);

    return this.cardNode;
  }
}
