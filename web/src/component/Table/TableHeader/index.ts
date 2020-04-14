import { div, i } from "wonnie-template";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";
import { Spacing } from "../../../styled-component/Spacing";

export class TableHeader {
  private cardCount: number;
  private tableName: string;
  private addCardSection: Function;
  private removeCardSection: Function;
  private changeIconNode: Element | Text | null;
  constructor(
    tableName: string,
    addCardSection: Function,
    removeCardSection: Function
  ) {
    this.cardCount = 0;
    this.tableName = tableName;
    this.addCardSection = addCardSection;
    this.removeCardSection = removeCardSection;
    this.changeIconNode = null;
    this.plusIconHandler = this.plusIconHandler.bind(this);
    this.closeIconHandler = this.closeIconHandler.bind(this);
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
    const numberCircle = div({ class: "number-circle" })([this.cardCount]);

    const about = Spacing({ left: 0.4 })(
      div({ class: "table-about" })([`${this.tableName}`])
    );

    const plusIcon = i({ class: "plus icon", onClick: this.plusIconHandler })();

    this.changeIconNode = i({
      class: "ellipsis horizontal icon",
      onClick: this.closeIconHandler,
    })();

    const leftSide = InlineList({ className: InlineListClass.DEFAULT })([
      numberCircle,
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
