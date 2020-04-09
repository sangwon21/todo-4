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
    (this.tableNode as Element).appendChild(new Card(textArea.value).render());
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

  render() {
    this.headerNode = this.tableHeader.render();
    this.tableNode = div({ class: `table done-table` })([
      this.headerNode,
      new Card("Hello World").render(),
    ]);
    return this.tableNode;
  }
}
