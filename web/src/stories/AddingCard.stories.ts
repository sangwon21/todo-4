import { storiesOf } from "@storybook/html";
import { AddingCard } from "../component/Table/AddingCard";
import { ButtonSize } from "../component/CustomButton";
import COLOR from "../util/color";

const defaultRightButtonType = {
  size: ButtonSize.large,
  color: COLOR.SECONDARY,
  content: "Cancel",
  contentColor: COLOR.FONT,
};

const defaultLeftButtonType = {
  size: ButtonSize.large,
  color: COLOR.PRIMARY,
  content: "Add",
  contentColor: COLOR.WHITE,
};

storiesOf("AddingCard Storybook", module).add("카드 더하기", () =>
  new AddingCard({
    rightButtonType: defaultRightButtonType,
    leftButtonType: defaultLeftButtonType,
    userClass: "",
  }).render()
);
