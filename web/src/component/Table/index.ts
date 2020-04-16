import { div } from "wonnie-template";
import { ButtonSize } from "../CustomButton";
import COLOR from "../../util/color";
import { AddingCard } from "./AddingCard";
import { TableHeader } from "./TableHeader";
import { Card } from "./Card";
import store from "../../store";
import { ADD_LOG_HISTORY } from "../../store/action/logHistory";

import "./Table.scss";

const defaultRightButtonType = {
  size: ButtonSize.large,
  color: COLOR.SECONDARY,
  content: "Cancel",
  contentColor: COLOR.FONT,
};

const defaultLeftButtonType = {
  size: ButtonSize.large,
  color: COLOR.INVALID_PRIMARY,
  content: "Add",
  contentColor: COLOR.WHITE,
};

interface ITableState {
  cardCounts: number;
  tableName: string;
  handleDragCardCountsChange: Function;
}

export class Table {
  private tableHeader: TableHeader;
  private addingCard: AddingCard;
  private headerNode: Element | Text | null = null;
  private tableNode: Element | Text | null = null;
  private addingCardNode: Element | Text | null = null;
  private state: ITableState;
  constructor(param: ITableState) {
    this.cancelCardButtonHandler = this.cancelCardButtonHandler.bind(this);
    this.createAddingCardSection = this.createAddingCardSection.bind(this);
    this.removeAddingCardSection = this.removeAddingCardSection.bind(this);
    this.addCardButtonHandler = this.addCardButtonHandler.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.getDragAfterElement = this.getDragAfterElement.bind(this);

    this.state = {
      cardCounts: param.cardCounts,
      tableName: param.tableName,
      handleDragCardCountsChange: param.handleDragCardCountsChange,
    };

    this.tableHeader = new TableHeader(
      this.state.tableName,
      this.createAddingCardSection,
      this.removeAddingCardSection
    );

    const rightButtonType = {
      ...defaultRightButtonType,
      callback: this.cancelCardButtonHandler,
    };
    const leftButtonType = {
      ...defaultLeftButtonType,
      callback: this.addCardButtonHandler,
    };
    this.addingCard = new AddingCard({
      userClass: "done",
      rightButtonType,
      leftButtonType,
    });
  }

  getTableNode() {
    return this.tableNode;
  }

  getTableName() {
    return this.state.tableName;
  }

  increaseCardCount() {
    this.state.cardCounts++;
    this.tableHeader.updateCardCounts(this.state.cardCounts);
  }

  decreaseCardCount() {
    if (this.state.cardCounts === 0) {
      return;
    }
    this.state.cardCounts--;
    this.tableHeader.updateCardCounts(this.state.cardCounts);
  }

  makeButtonInvalid() {
    const leftButton = (this.tableNode as Element).querySelector("button")!;
    leftButton.setAttribute(
      "style",
      `background-color: ${COLOR.INVALID_PRIMARY}; color: ${COLOR.WHITE}; width: 10rem; height: 2rem`
    );
  }

  cancelCardButtonHandler() {
    const textArea = (this.tableNode as Element).querySelector(
      "textarea"
    ) as HTMLTextAreaElement;
    textArea!.value = "";
    this.makeButtonInvalid();
  }

  addCardButtonHandler() {
    const textArea = (this.tableNode as Element).querySelector(
      "textarea"
    )! as HTMLTextAreaElement;

    if (textArea.value === "") {
      return;
    }

    const firstCard = (this.tableNode as Element).querySelector(".card");
    (this.tableNode as Element).insertBefore(
      new Card({
        isLoading: false,
        contents: textArea.value,
        tableType: this.state.tableName,
        tableNode: this.tableNode as Element,
        handleDragCardCountsChange: this.state.handleDragCardCountsChange,
      }).render(),
      firstCard
    );

    store.dispatch({
      type: ADD_LOG_HISTORY,
      userAction: "added",
      contents: textArea.value,
      suffix: `to ${this.state.tableName}`,
    });

    this.increaseCardCount();
    this.makeButtonInvalid();
    textArea.value = "";
  }

  createAddingCardSection() {
    this.addingCardNode = this.addingCard.render();
    this.tableNode!.insertBefore(
      this.addingCardNode,
      this.headerNode!.nextSibling
    );
  }

  removeAddingCardSection() {
    this.addingCardNode && this.addingCardNode.remove();
    this.addingCardNode = null;
  }

  getDragAfterElement(y: number): Element | null {
    const draggableElements = [
      ...(this.tableNode! as Element).querySelectorAll(
        `[draggable="true"]:not(.dragging)`
      ),
    ];

    let targetOffset = Number.NEGATIVE_INFINITY;
    let targetElement = null;
    for (let i = 0; i < draggableElements.length; i++) {
      const box = draggableElements[i].getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > targetOffset) {
        targetOffset = offset;
        targetElement = draggableElements[i];
      }
    }

    return targetElement;
  }

  handleDragOver(e: DragEvent) {
    e.preventDefault();
    const afterElement = this.getDragAfterElement(e.clientY)!;
    const draggable = document.querySelector(".dragging")!;
    if (afterElement === null) {
      (this.tableNode! as Element).appendChild(draggable);
    } else {
      (this.tableNode! as Element).insertBefore(draggable, afterElement);
    }
  }

  render() {
    this.headerNode = this.tableHeader.render();
    this.tableNode = div({
      class: `table`,
      onDragover: this.handleDragOver,
    })([this.headerNode]);
    return this.tableNode;
  }
}
