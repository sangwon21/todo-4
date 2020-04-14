import { storiesOf } from "@storybook/html";
import { Table } from "../component/Table";

storiesOf("Table Storybook", module).add("기본 헤더", () =>
  new Table({
    cardCounts: 0,
    tableName: "할 일",
    handleDragCardCountsChange: () => {},
  }).render()
);
