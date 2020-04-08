import { storiesOf } from "@storybook/html";
import {
  ButtonType,
  CustomButton,
  ButtonSize,
} from "../component/CustomButton/index";
import COLOR from "../util/color";

const clickHandler = (e: MouseEvent) => {
  console.log("hello world");
};

const basicSettings: ButtonType = {
  size: ButtonSize.small,
  color: COLOR.CONFIRM,
  callback: clickHandler,
  content: "제출",
  contentColor: COLOR.FONT,
};

const mediumSettings: ButtonType = {
  size: ButtonSize.medium,
  color: COLOR.PRIMARY,
  callback: clickHandler,
  content: "제출",
  contentColor: COLOR.FONT,
};

const largeSettings: ButtonType = {
  size: ButtonSize.large,
  color: COLOR.BACKGROUND,
  callback: clickHandler,
  content: "제출",
  contentColor: COLOR.FONT,
};

storiesOf("기본 custom button", module)
  .add("small button", () => CustomButton(basicSettings))
  .add("medium button", () => CustomButton(mediumSettings))
  .add("large button", () => CustomButton(largeSettings));
