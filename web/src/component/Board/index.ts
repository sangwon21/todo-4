import { Table } from "../Table";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";

interface IBoardState {
  tables: Table[];
}

export class Board {
  private state: IBoardState;
  constructor() {
    this.handleDragCardCountsChange = this.handleDragCardCountsChange.bind(
      this
    );
    this.state = {
      tables: [],
    };
  }

  pushToTables(table: Table) {
    this.state.tables.push(table);
  }

  handleDragCardCountsChange(cardElement: Element, tableElement: Element) {
    let returnTableElement = tableElement;
    let targetTableName = "";

    this.state.tables.forEach((table) => {
      const tableNode = table.getTableNode()!;
      if (tableNode.contains(cardElement)) {
        if (tableNode === tableElement) {
          return;
        }
        table.increaseCardCount();
        targetTableName = table.getTableName();
        returnTableElement = tableNode as Element;
        return;
      }
      if (tableNode === tableElement && !tableNode.contains(cardElement)) {
        table.decreaseCardCount();
        return;
      }
    });
    return { returnTableElement, targetTableName };
  }

  render() {
    const todo = new Table({
      cardCounts: 0,
      tableName: "할 일",
      handleDragCardCountsChange: this.handleDragCardCountsChange,
    });
    const doing = new Table({
      cardCounts: 0,
      tableName: "하는 중",
      handleDragCardCountsChange: this.handleDragCardCountsChange,
    });
    const done = new Table({
      cardCounts: 0,
      tableName: "한 일",
      handleDragCardCountsChange: this.handleDragCardCountsChange,
    });

    this.pushToTables(todo);
    this.pushToTables(doing);
    this.pushToTables(done);

    return InlineList({
      className: InlineListClass.SPACE_AROUND,
      width: "100%",
    })([todo.render(), doing.render(), done.render()]);
  }
}
