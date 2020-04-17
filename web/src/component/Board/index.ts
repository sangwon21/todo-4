import { Table } from "../Table";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";

interface IBoardState {
  tables: Table[];
}

export interface IBoardCardParam {
  id: number;
  author: string;
  title: string;
  note?: string;
}

interface IBoardParam {
  id: number;
  title: string;
  cards: IBoardCardParam[];
}

export class Board {
  private state: IBoardState;
  private param: IBoardParam[];
  constructor(boardParam: IBoardParam[]) {
    this.handleDragCardCountsChange = this.handleDragCardCountsChange.bind(
      this
    );
    this.state = {
      tables: [],
    };
    this.param = boardParam;
  }

  pushToTables(table: Table) {
    this.state.tables.push(table);
  }

  handleDragCardCountsChange(cardElement: Element, tableElement: Element) {
    let returnTableElement = tableElement;
    let targetTableName = "";
    let tableId = 1;
    this.state.tables.forEach((table) => {
      const tableNode = table.getTableNode()!;
      if (tableNode.contains(cardElement)) {
        if (tableNode === tableElement) {
          return;
        }
        table.increaseCardCount();
        targetTableName = table.getTableName();
        tableId = table.getTableId();
        returnTableElement = tableNode as Element;
        return;
      }
      if (tableNode === tableElement && !tableNode.contains(cardElement)) {
        table.decreaseCardCount();
        return;
      }
    });
    return { returnTableElement, targetTableName, tableId };
  }

  render() {
    const tables = this.param.map(
      (param) =>
        new Table({
          tableId: param.id,
          cardCounts: param.cards.length,
          tableName: param.title,
          handleDragCardCountsChange: this.handleDragCardCountsChange,
          cards: param.cards,
        })
    );

    tables.forEach((table) => this.pushToTables(table));
    const renderedTables = tables.map((table) => table.render());
    return InlineList({
      className: InlineListClass.SPACE_AROUND,
      width: "100%",
    })(renderedTables);
  }
}
