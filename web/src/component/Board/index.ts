import { Table } from "../Table";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";

export class Board {
  constructor() {}

  render() {
    return InlineList({ class: InlineListClass.DEFAULT, width: "100%" })([
      new Table("할 일").render(),
      new Table("하는 중").render(),
      new Table("한 일").render(),
    ]);
  }
}
