import { div, i, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { EditModal } from "./EditModal";

import "./card.scss";

export class Card {
  private contents: string;
  private cardNode: Element | Text | null;
  private modalOpen: boolean;
  constructor(contents: string) {
    this.contents = contents;
    this.cardNode = null;
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleTaskEditClick = this.handleTaskEditClick.bind(this);
    this.modalOpen = false;
  }

  closeButtonHandler() {
    this.cardNode && this.cardNode.remove();
  }

  handleDragStart(e: DragEvent) {
    const target = e.target! as Element;
    target.classList.add("dragging");
  }

  handleDragEnd(e: DragEvent) {
    const target = e.target! as Element;
    target.classList.remove("dragging");
  }

  handleTaskEditClick() {
    this.cardNode?.appendChild(new EditModal().render());
  }

  render() {
    const rightHeader = InlineList({ class: InlineListClass.DEFAULT })([
      i({ class: "tasks icon", onClick: this.handleTaskEditClick })(),
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
      attributes: {
        draggable: "true",
        onDragstart: this.handleDragStart,
        onDragend: this.handleDragEnd,
      },
    })([header, footer]);

    return this.cardNode;
  }
}
