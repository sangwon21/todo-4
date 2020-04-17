import { div, i } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { Spacing } from "../../../styled-component/Spacing";

interface ITableHeaderState {
  cardCounts: number;
}

export class TableHeader {
  private tableName: string;
  private addCardSection: Function;
  private removeCardSection: Function;
  private changeIconNode: Element | Text | null = null;
  private numberCircleNode: Element | Text | null = null;
  private state: ITableHeaderState;
  constructor(
    cardCounts: number,
    tableName: string,
    addCardSection: Function,
    removeCardSection: Function
  ) {
    this.state = {
      cardCounts,
    };
    this.tableName = tableName;
    this.addCardSection = addCardSection;
    this.removeCardSection = removeCardSection;
    this.plusIconHandler = this.plusIconHandler.bind(this);
    this.closeIconHandler = this.closeIconHandler.bind(this);
  }

  updateCardCounts(cardCounts: number) {
    this.state.cardCounts = cardCounts;
    (this
      .numberCircleNode! as HTMLDivElement).innerHTML = this.state.cardCounts.toString();
  }

  plusIconHandler() {
    const classList = (this.changeIconNode! as Element).classList;
    if (classList.contains("ellipsis")) {
      classList.remove("ellipsis");
      classList.remove("horizontal");
      classList.add("close");
      this.addCardSection();
    }
  }

  closeIconHandler() {
    const classList = (this.changeIconNode! as Element).classList;
    if (classList.contains("close")) {
      classList.remove("close");
      classList.add("ellipsis");
      classList.add("horizontal");
      this.removeCardSection();
    }
  }

  render() {
    this.numberCircleNode = div({ class: "number-circle" })([
      this.state.cardCounts,
    ]);

    const about = Spacing({ left: 0.4 })(
      div({ class: "table-about" })([`${this.tableName}`])
    );

    const plusIcon = i({ class: "plus icon", onClick: this.plusIconHandler })();

    this.changeIconNode = i({
      class: "ellipsis horizontal icon",
      onClick: this.closeIconHandler,
    })();

    const leftSide = InlineList({ className: InlineListClass.DEFAULT })([
      this.numberCircleNode,
      about,
    ]);
    const rightSide = InlineList({ className: InlineListClass.DEFAULT })([
      plusIcon,
      this.changeIconNode,
    ]);

    return InlineList({ className: InlineListClass.SPACE_BETWEEN })([
      leftSide,
      rightSide,
    ]);
  }
}
