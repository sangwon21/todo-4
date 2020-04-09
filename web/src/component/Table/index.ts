import { div } from "wonnie-template";
import { AddingCard } from "./AddingCard";
import { TableHeader } from "./TableHeader";
import { Card } from "./Card";

import "./Table.scss";

export class Table {
  private tableHeader: TableHeader;
  private addingCard: AddingCard;
  private headerNode: Element | Text | null;
  private tableNode: Element | Text | null;
  private addingCardNode: Element | Text | null;
  constructor(tableName: string) {
    this.cancelCardButtonHandler = this.cancelCardButtonHandler.bind(this);
    this.createAddingCardSection = this.createAddingCardSection.bind(this);
    this.removeAddingCardSection = this.removeAddingCardSection.bind(this);
    this.addCardButtonHandler = this.addCardButtonHandler.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.getDragAfterElement = this.getDragAfterElement.bind(this);
    this.tableHeader = new TableHeader(
      tableName,
      this.createAddingCardSection,
      this.removeAddingCardSection
    );
    this.headerNode = null;
    this.tableNode = null;
    this.addingCard = new AddingCard({
      userClass: "done",
      rightButtonCallback: this.cancelCardButtonHandler,
      leftButtonCallback: this.addCardButtonHandler,
    });
    this.addingCardNode = null;
  }

  cancelCardButtonHandler() {
    const textArea = (this.tableNode as Element).querySelector(
      "textarea"
    ) as HTMLTextAreaElement;
    textArea!.value = "";
  }

  addCardButtonHandler() {
    const textArea = (this.tableNode as Element).querySelector(
      "textarea"
    )! as HTMLTextAreaElement;
    const firstCard = (this.tableNode as Element).querySelector(".card");
    (this.tableNode as Element).insertBefore(
      new Card(textArea.value).render(),
      firstCard
    );
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
      class: `table done-table`,
      onDragover: this.handleDragOver,
    })([this.headerNode, new Card("Hello World").render()]);
    return this.tableNode;
  }
}
