import { storiesOf } from "@storybook/html";
import { Board } from "../component/Board";

storiesOf("Board Storybook", module).add("여러 Table", () =>
  new Board().render()
);
