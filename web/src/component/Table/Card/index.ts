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
import API from "../../../util/api";
import axios from "axios";
axios.defaults.headers.common = {
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlLXNxdWFkLmNvbSIsInVzZXJJZCI6ImV2ZXIifQ.d4ou2_dOSFipKXodcNubJDnyqu48XZp6FiH_pZJhgc4",
};

import "./card.scss";

export interface ICardState {
  cardId: number;
  tableId: number;
  contents: string;
  isLoading: boolean;
  tableType: string;
  tableNode?: Element | null;
  cardOrder?: number;
  handleDragCardCountsChange: Function;
  decreaseCardCount: Function;
}

export class Card {
  private cardNode: Element | Text | null = null;
  private contentNode: Element | Text | null = null;
  private spinnerNode: Element | Text | null = null;
  private state: ICardState = {
    cardId: 1,
    tableId: 1,
    contents: "",
    isLoading: false,
    tableType: "",
    tableNode: null,
    handleDragCardCountsChange: () => {},
    decreaseCardCount: () => {},
  };

  constructor(cardParam: ICardState) {
    this.state.cardId = cardParam.cardId;
    this.state.tableId = cardParam.tableId;
    this.state.contents = cardParam.contents;
    this.state.tableType = cardParam.tableType;
    this.state.tableNode = cardParam.tableNode;
    this.state.cardOrder = cardParam.cardOrder;
    this.state.handleDragCardCountsChange =
      cardParam.handleDragCardCountsChange;
    this.state.decreaseCardCount = cardParam.decreaseCardCount;
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
      const { data } = await axios({
        method: "DELETE",
        url: API.REMOVE_CARD(this.state.tableId),
        data: {
          card: { id: this.state.cardId },
          history: {
            userAction: "removed",
            contents: this.state.contents,
            suffix: `from ${this.state.tableType}`,
          },
        },
      });

      store.dispatch({
        type: ADD_LOG_HISTORY,
        userAction: "removed",
        contents: this.state.contents,
        suffix: `from ${this.state.tableType}`,
        historyCreatedTime: data,
      });
      this.cardNode && this.cardNode.remove();
      this.state.decreaseCardCount();
    } catch (error) {
      this.cardNode!.appendChild(new FailModal().render());
    } finally {
      this.state.isLoading = false;
      this.handleLoading();
    }
  }

  setCardOrder(cardOrder: number) {
    this.state.cardOrder = cardOrder;
  }

  handleDragStart(e: DragEvent) {
    const target = e.target! as Element;
    target.classList.add("dragging");
  }

  setTableNode(table: Element) {
    this.state.tableNode = table;
  }

  async handleDragEnd(e: DragEvent) {
    const target = e.target! as Element;

    const { returnTableElement, targetTableName, tableId } = this.state
      .handleDragCardCountsChange!(target, this.state.tableNode);
    this.setTableNode(returnTableElement);
    const array = [
      ...(returnTableElement as Element).querySelectorAll(".card"),
    ];

    const number = array.indexOf(this.cardNode as Element);

    target.classList.remove("dragging");
    const previousTableName = this.state.tableType;
    try {
      if (targetTableName !== "") {
        this.state.tableType = targetTableName;
        this.state.tableId = tableId;
      }
      const { data } = await axios.put(
        API.UPDATE_DRAGGED_CARD(this.state.tableId),
        {
          location: {
            cardId: this.state.cardId,
            columnId: this.state.tableId,
            afterMoveCardIndex: number,
          },
          history: {
            userAction: "moved",
            contents: this.state.contents,
            suffix: `from ${previousTableName} to ${this.state.tableType}`,
          },
        }
      );

      store.dispatch({
        type: ADD_LOG_HISTORY,
        userAction: "moved",
        contents: this.state.contents,
        suffix: `from ${previousTableName} to ${this.state.tableType}`,
        historyCreatedTime: data,
      });
    } catch {
      this.cardNode!.appendChild(new FailModal().render());
    } finally {
      this.state.isLoading = false;
      this.handleLoading();
    }
  }

  handleTaskEditClick() {
    this.state.tableNode!.appendChild(
      new EditModal({
        noteContent: this.state.contents,
        editContent: this.editTask,
      }).render()
    );
  }

  async editTask(task: string) {
    (this.contentNode! as Element).innerHTML = task;
    this.state.contents = task;
    try {
      const { data } = await axios.put(API.UPDATE_CARD(this.state.tableId), {
        card: {
          id: this.state.cardId,
          title: this.state.contents,
          note: "ios 힘들겠다",
          author: "nigayo",
        },
        history: {
          userAction: "updated",
          contents: this.state.contents,
        },
      });

      store.dispatch({
        type: ADD_LOG_HISTORY,
        userAction: "updated",
        contents: this.state.contents,
        historyCreatedTime: data,
      });
    } catch {
      this.cardNode!.appendChild(new FailModal().render());
    } finally {
      this.state.isLoading = false;
      this.handleLoading();
    }
  }

  handleLoading() {
    const cardNode = this.cardNode! as Element;
    if (this.state.isLoading) {
      cardNode.classList.add("invalid");
      cardNode.setAttribute("draggable", "false");
      cardNode.appendChild(this.spinnerNode! as Element);
      return;
    }
    cardNode.classList.remove("invalid");
    cardNode.setAttribute("draggable", "true");
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
