import { storiesOf } from "@storybook/html";
import { FailModal } from "../component/Table/Card/FailModal";

storiesOf("Fail Modal Storybook", module).add("기본 Modal 창", () =>
  new FailModal().render()
);
