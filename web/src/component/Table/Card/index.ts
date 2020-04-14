import { div, i, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { EditModal } from "./EditModal";
import { FailModal } from "./FailModal";
import { Spinner, SpinnerSize } from "../../Spinner";
import axios from "axios";

import "./card.scss";

export interface ICardState {
  contents: string;
  isLoading: boolean;
}

export class Card {
  private cardNode: Element | Text | null = null;
  private contentNode: Element | Text | null = null;
  private previousNode: Element | null = null;
  private spinnerNode: Element | Text | null = null;
  private state: ICardState = { contents: "", isLoading: false };

  constructor(cardParam: ICardState) {
    this.state.contents = cardParam.contents;
    this.spinnerNode = Spinner(SpinnerSize.SMALL);
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleTaskEditClick = this.handleTaskEditClick.bind(this);
  }

  async closeButtonHandler() {
    this.state.isLoading = true;
    this.handleLoading();
    try {
      const statusCode = await axios.delete(
        "http://52.207.159.215:8080/columns/1/cards/1",
        {}
      );
      this.cardNode && this.cardNode.remove();
    } catch (error) {
      this.cardNode!.appendChild(new FailModal().render());
    } finally {
      this.state.isLoading = false;
      this.handleLoading();
    }
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
        noteContent: this.state.contents,
        editContent: this.editTask,
      }).render()
    );
  }

  editTask(task: string) {
    (this.contentNode! as Element).innerHTML = task;
    this.state.contents = task;
  }

  handleLoading() {
    if (this.state.isLoading) {
      this.contentNode!.appendChild(this.spinnerNode! as Element);
      return;
    }
    this.spinnerNode!.remove();
  }

  render() {
    this.contentNode = InlineList({
      className: InlineListClass.DEFAULT,
      userClassList: ["card-contents"],
      width: "80%",
    })([div()([this.state.contents])]);

    const rightHeader = InlineList({
      className: InlineListClass.DEFAULT,
      width: "80%",
    })([i({ class: "tasks icon" })(), this.contentNode]);

    const closeButton = div({ onClick: this.closeButtonHandler })([
      i({ class: "close icon" })(),
    ]);

    const header = InlineList({
      className: InlineListClass.SPACE_BETWEEN,
      width: "100%",
    })([rightHeader, closeButton]);

    const footer = InlineList({ className: InlineListClass.DEFAULT })([
      span({ class: "card-prefix" })(["Added by"]),
      span({ class: "card-author" })(["nigayo"]),
    ]);

    this.cardNode = InlineList({
      className: InlineListClass.SPACE_BETWEEN_COLUMN,
      userClassList: ["card"],
      attributes: {
        draggable: "true",
        onDragstart: this.handleDragStart,
        onDragend: this.handleDragEnd,
        onDblClick: this.handleTaskEditClick,
      },
    })([header, footer]);

    return this.cardNode;
  }
}
