import { storiesOf } from "@storybook/html";
import { Spacing, ISpacingStyleParameter } from "../styled-component/Spacing";
import { div } from "wonnie-template";

const greenBox = div({
  style: "background-color: #0fe224; border: 3px solid #0f24e2;",
})(["box"]);

const fromTop: ISpacingStyleParameter = {
  top: 5,
};

const fromLeft: ISpacingStyleParameter = {
  left: 4,
};

const fromRight: ISpacingStyleParameter = {
  right: 12,
};

const fromBottom: ISpacingStyleParameter = {
  bottom: 6,
};

storiesOf("Spacing 기본 스타일", module)
  .add("기본 스타일", () => Spacing()(greenBox))
  .add("top spacing", () => Spacing(fromTop)(greenBox))
  .add("left spacing", () => Spacing(fromLeft)(greenBox))
  .add("bottom spacing", () => Spacing(fromBottom)(greenBox))
  .add("right spacing", () => Spacing(fromRight)(greenBox));
