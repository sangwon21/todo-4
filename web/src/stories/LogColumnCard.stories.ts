import { storiesOf } from "@storybook/html";
import { LogColumnCard } from "../component/Header/LogColumn/LogColumnCard";

storiesOf("LogColumnCard Storybook", module).add("기본 LogColumn 설정", () =>
  new LogColumnCard().render()
);
