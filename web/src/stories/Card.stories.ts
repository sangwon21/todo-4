import { storiesOf } from "@storybook/html";
import { Card } from "../component/Table/Card";

storiesOf("Card Storybook", module).add("기본 카드", () =>
  new Card({ title: "안녕 친구들", contents: "typescript 공부하기" }).render()
);
