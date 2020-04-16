import { storiesOf } from "@storybook/html";
import { Spinner, SpinnerSize } from "../component/Spinner";

storiesOf("Spinner Storybook", module)
  .add("Spinner small size", () => Spinner(SpinnerSize.SMALL))
  .add("Spinner medium size", () => Spinner(SpinnerSize.MEDIUM))
  .add("Spinner large size", () => Spinner(SpinnerSize.LARGE));
