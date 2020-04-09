import { storiesOf } from "@storybook/html";
import { EditModal } from "../component/Table/Card/EditModal";

storiesOf("Edit Modal Storybook", module).add("기본 Modal 창", () =>
  new EditModal().render()
);
