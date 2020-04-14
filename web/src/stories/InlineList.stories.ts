import { storiesOf } from "@storybook/html";
import { InlineList, InlineListClass } from "../styled-component/InlineList";
import { div } from "wonnie-template";

const contents = [
  div({
    style:
      "background-color: #e00808; color: #ffffff; height: 4rem; width: 4rem;",
  })(["test1"]),
  div({
    style:
      "background-color: #f8fc00; color: #b7b7aa; height: 4rem; width: 4rem;",
  })(["test2"]),
  div({
    style:
      "background-color: #07f94c; color: #ffffff; height: 4rem; width: 4rem;",
  })(["test3"]),
];

storiesOf("InlineList Storybook - Row 방향", module)
  .add("기본 스타일", () => InlineList()(contents))
  .add("space between", () =>
    InlineList({ className: InlineListClass.SPACE_BETWEEN })(contents)
  )
  .add("align center", () =>
    InlineList({ className: InlineListClass.ALIGN_CENTER })(contents)
  )
  .add("align right", () =>
    InlineList({ className: InlineListClass.ALIGN_RIGHT })(contents)
  );

storiesOf("InlineList Storybook - Column 방향", module)
  .add("기본 스타일", () =>
    InlineList({ className: InlineListClass.COLUMN_BASE })(contents)
  )
  .add("align center column base", () =>
    InlineList({ className: InlineListClass.ALIGN_CENTER_COLUMN })(contents)
  )
  .add("align right column base", () =>
    InlineList({ className: InlineListClass.ALIGN_RIGHT_COLUMN })(contents)
  );
