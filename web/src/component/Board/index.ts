import { Table } from "../Table";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";

export class Board {
  private boardClass: string;
  constructor(boardClass: string) {
    this.boardClass = boardClass;
  }

  render() {
    return InlineList({
      class: InlineListClass.SPACE_AROUND,
      width: "100%",
      userClassList: [this.boardClass],
    })([
      new Table("할 일").render(),
      new Table("하는 중").render(),
      new Table("한 일").render(),
    ]);
  }
}
