import { storiesOf } from "@storybook/html";
import { EditModal } from "../component/Table/Card/EditModal";

const example = () => {
  console.log("Hello World");
};

storiesOf("Edit Modal Storybook", module).add("기본 Modal 창", () =>
  new EditModal({
    noteContent: "Hello World",
    editContent: example,
  }).render()
);
