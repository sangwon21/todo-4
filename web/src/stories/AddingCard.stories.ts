import { storiesOf } from "@storybook/html";
import { AddingCard } from "../component/Table/AddingCard";

storiesOf("AddingCard Storybook", module).add("카드 더하기", () =>
  new AddingCard().render()
);
