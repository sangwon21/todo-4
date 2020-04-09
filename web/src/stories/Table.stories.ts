import { storiesOf } from "@storybook/html";
import { Table } from "../component/Table";

storiesOf("Table Storybook", module).add("기본 헤더", () =>
  new Table("할 일").render()
);
