import { storiesOf } from "@storybook/html";
import { Card } from "../component/Card";

storiesOf("Card Storybook", module).add("기본 카드", () =>
  new Card("typescript 공부하기").render()
);
