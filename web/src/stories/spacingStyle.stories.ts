import { storiesOf } from "@storybook/html";
import {
  makeSpacingStyle,
  ISpacingStyleParameter,
} from "../styled-component/spacingStyle";
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
  .add("기본 스타일", () => makeSpacingStyle()(greenBox))
  .add("top spacing", () => makeSpacingStyle(fromTop)(greenBox))
  .add("left spacing", () => makeSpacingStyle(fromLeft)(greenBox))
  .add("bottom spacing", () => makeSpacingStyle(fromBottom)(greenBox))
  .add("right spacing", () => makeSpacingStyle(fromRight)(greenBox));
