import { div, i, span } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { EditModal } from "./EditModal";
import { FailModal } from "./FailModal";
import { Spinner, SpinnerSize } from "../../Spinner";
import store from "../../../store";
import { ADD_LOG_HISTORY } from "../../../store/action/logHistory";
import axios from "axios";

import "./card.scss";

export interface ICardState {
  contents: string;
  isLoading: boolean;
  tableType: string;
  tableNode?: Element | null;
  handleDragCardCountsChange: Function;
}

export class Card {
  private cardNode: Element | Text | null = null;
  private contentNode: Element | Text | null = null;
  private spinnerNode: Element | Text | null = null;
  private state: ICardState = {
    contents: "",
    isLoading: false,
    tableType: "",
    tableNode: null,
    handleDragCardCountsChange: () => {},
  };

  constructor(cardParam: ICardState) {
    this.state.contents = cardParam.contents;
    this.state.tableType = cardParam.tableType;
    this.state.tableNode = cardParam.tableNode;
    this.state.handleDragCardCountsChange =
      cardParam.handleDragCardCountsChange;
    this.spinnerNode = Spinner(SpinnerSize.SMALL);
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleTaskEditClick = this.handleTaskEditClick.bind(this);
    this.setTableNode = this.setTableNode.bind(this);
  }

  async closeButtonHandler() {
    this.state.isLoading = true;
    this.handleLoading();
    try {
      const statusCode = await axios.delete(
        "http://52.207.159.215:8080/columns/1/cards/1",
        {}
      );
      store.dispatch({
        type: ADD_LOG_HISTORY,
        userAction: "removed",
        contents: this.state.contents,
        suffix: `from ${this.state.tableType}`,
      });
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

  setTableNode(table: Element) {
    this.state.tableNode = table;
  }

  handleDragEnd(e: DragEvent) {
    const target = e.target! as Element;
    const { returnTableElement, targetTableName } = this.state
      .handleDragCardCountsChange!(target, this.state.tableNode);
    this.setTableNode(returnTableElement);
    target.classList.remove("dragging");
    const previousTableName = this.state.tableType;
    if (targetTableName !== "") {
      this.state.tableType = targetTableName;
    }

    store.dispatch({
      type: ADD_LOG_HISTORY,
      userAction: "moved",
      contents: this.state.contents,
      suffix: `from ${previousTableName} to ${this.state.tableType}`,
    });
  }

  handleTaskEditClick() {
    this.state.tableNode!.appendChild(
      new EditModal({
        noteContent: this.state.contents,
        editContent: this.editTask,
      }).render()
    );
  }

  editTask(task: string) {
    (this.contentNode! as Element).innerHTML = task;
    this.state.contents = task;

    store.dispatch({
      type: ADD_LOG_HISTORY,
      userAction: "updated",
      contents: this.state.contents,
    });
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
