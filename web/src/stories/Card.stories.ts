import { storiesOf } from "@storybook/html";
import { Card } from "../component/Table/Card";

storiesOf("Card Storybook", module).add("기본 카드", () =>
  new Card({
    isLoading: false,
    contents: "typescript 공부하기",
    tableType: "할 일",
    handleDragCardCountsChange: () => {},
  }).render()
);
