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
  private contentNode: Element | Text | null;
  constructor(contents: string) {
    this.contents = contents;
    this.cardNode = null;
    this.contentNode = null;
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleTaskEditClick = this.handleTaskEditClick.bind(this);
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
    this.cardNode!.appendChild(
      new EditModal({
        noteContent: this.contents,
        editContent: this.editTask,
      }).render()
    );
  }

  editTask(task: string) {
    (this.contentNode! as Element).innerHTML = task;
    this.contents = task;
  }

  render() {
    this.contentNode = div({ class: "card-title" })([this.contents]);
    const rightHeader = InlineList({ class: InlineListClass.DEFAULT })([
      i({ class: "tasks icon", onClick: this.handleTaskEditClick })(),
      this.contentNode,
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
