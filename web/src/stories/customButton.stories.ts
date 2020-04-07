import { storiesOf } from "@storybook/html";
import {
  ButtonStatus,
  ButtonType,
  customButton,
  ButtonSize,
} from "../component/button/index";

const clickHandler = (e: MouseEvent) => {
  console.log("hello world");
};

const basicSettings: ButtonType = {
  size: ButtonSize.small,
  color: ButtonStatus.danger,
  callback: clickHandler,
  content: "제출",
  contentColor: ButtonStatus.dark,
};

const mediumSettings: ButtonType = {
  size: ButtonSize.medium,
  color: ButtonStatus.primary,
  callback: clickHandler,
  content: "제출",
  contentColor: ButtonStatus.light,
};

const largeSettings: ButtonType = {
  size: ButtonSize.large,
  color: ButtonStatus.success,
  callback: clickHandler,
  content: "제출",
  contentColor: ButtonStatus.dark,
};

storiesOf("기본 custom button", module)
  .add("small button", () => customButton(basicSettings))
  .add("medium button", () => customButton(mediumSettings))
  .add("large button", () => customButton(largeSettings));
