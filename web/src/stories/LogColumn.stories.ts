import { storiesOf } from "@storybook/html";
import { LogColumn } from "../component/Header/LogColumn";

storiesOf("LogColumn Storybook", module).add("기본 LogColumn 설정", () =>
  new LogColumn().render()
);
