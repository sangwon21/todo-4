import { storiesOf } from "@storybook/html";
import { Header } from "../component/Header";

storiesOf("Header storybook", module).add("헤더 기본 설정", () =>
  new Header().render()
);
