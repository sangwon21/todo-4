import { div, i, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { EditModal } from "./EditModal";
import { Spinner, SpinnerSize } from "../../Spinner";
import axios from "axios";

import "./card.scss";

export interface ICard {
  contents: string;
  title: string;
}

export class Card {
  private cardNode: Element | Text | null;
  private contentNode: Element | Text | null;
  private previousNode: Element | null;
  private isLoading: boolean;
  private contents: string;
  private title: string;
  constructor(cardParam: ICard) {
    this.contents = cardParam.contents;
    this.title = cardParam.title;
    this.cardNode = null;
    this.contentNode = null;
    this.previousNode = null;
    this.isLoading = false;
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleTaskEditClick = this.handleTaskEditClick.bind(this);
  }

  async closeButtonHandler() {
    const statusCode = await axios.delete(
      "http://52.207.159.215:8080/columns/1/cards/1",
      {}
    );
    console.log(statusCode);
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
    const title = InlineList({
      class: InlineListClass.DEFAULT,
      userClassList: ["card-title"],
      width: "80%",
    })([div()([this.title]), Spinner(SpinnerSize.SMALL)]);

    this.contentNode = title;
    const rightHeader = InlineList({
      class: InlineListClass.DEFAULT,
      width: "80%",
    })([
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
