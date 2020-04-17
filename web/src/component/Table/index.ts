import { div } from "wonnie-template";
import { ButtonSize } from "../CustomButton";
import COLOR from "../../util/color";
import { AddingCard } from "./AddingCard";
import { TableHeader } from "./TableHeader";
import { Card } from "./Card";
import store from "../../store";
import { ADD_LOG_HISTORY } from "../../store/action/logHistory";
import API from "../../util/api";
import { IBoardCardParam } from "../Board";
import axios from "axios";

import "./Table.scss";

axios.defaults.headers.common = {
  token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlLXNxdWFkLmNvbSIsInVzZXJJZCI6IkVWRVIifQ.qBB-zuqxeXMxTeqWeDU4esYUv5ew2VCamWNmvZM7kA4`,
};

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
  tableId: number;
  cardCounts: number;
  tableName: string;
  handleDragCardCountsChange: Function;
  cards: IBoardCardParam[];
}

interface IServerData {
  data: {
    id: number;
    historyCreatedTime: string;
  };
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
    this.decreaseCardCount = this.decreaseCardCount.bind(this);

    this.state = {
      tableId: param.tableId,
      cardCounts: param.cardCounts,
      tableName: param.tableName,
      handleDragCardCountsChange: param.handleDragCardCountsChange,
      cards: param.cards,
    };

    this.tableHeader = new TableHeader(
      this.state.cardCounts,
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

  getTableId() {
    return this.state.tableId;
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
      this.tableHeader.updateCardCounts(this.state.cardCounts);
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

  async addCardButtonHandler() {
    const textArea = (this.tableNode as Element).querySelector(
      "textarea"
    )! as HTMLTextAreaElement;

    if (textArea.value === "") {
      return;
    }

    try {
      const { data }: IServerData = await axios.post(
        API.MAKE_NEW_CARD(this.state.tableId),
        {
          card: {
            title: textArea.value,
            author: "nigayo",
            note: "ios 힘들겠다...",
          },
          history: {
            userAction: "added",
            contents: textArea.value,
            suffix: `to ${this.state.tableName}`,
          },
        }
      );
      const cardId = data.id;
      const { historyCreatedTime } = data;
      store.dispatch({
        type: ADD_LOG_HISTORY,
        userAction: "added",
        contents: textArea.value,
        suffix: `to ${this.state.tableName}`,
        historyCreatedTime,
      });

      (this.tableNode as Element).appendChild(
        new Card({
          cardId,
          isLoading: false,
          contents: textArea.value,
          tableType: this.state.tableName,
          tableNode: this.tableNode as Element,
          handleDragCardCountsChange: this.state.handleDragCardCountsChange,
          cardOrder: this.state.cardCounts,
          tableId: this.state.tableId,
          decreaseCardCount: this.decreaseCardCount,
        }).render()
      );

      this.increaseCardCount();
      this.makeButtonInvalid();
      textArea.value = "";
    } catch {}
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

    this.state.cards
      .map(
        (cardParam) =>
          new Card({
            cardId: cardParam.id,
            handleDragCardCountsChange: this.state.handleDragCardCountsChange,
            contents: cardParam.title,
            isLoading: false,
            tableType: this.state.tableName,
            tableNode: this.tableNode as Element,
            tableId: this.state.tableId,
            decreaseCardCount: this.decreaseCardCount,
          })
      )
      .map((cardObject) => cardObject.render())
      .forEach((cardElement) => this.tableNode!.appendChild(cardElement));
    return this.tableNode;
  }
}
