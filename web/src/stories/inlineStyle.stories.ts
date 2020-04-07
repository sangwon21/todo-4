import { storiesOf } from "@storybook/html";
import { makeInlineStyles } from "../styled-component/inlineStyle";
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

storiesOf("Inline 기본 스타일", module)
  .add("기본 스타일", () => makeInlineStyles()(contents))
  .add("align center", () => makeInlineStyles("alignCenter")(contents))
  .add("align right", () => makeInlineStyles("alignRight")(contents))
  .add("vertical align top", () =>
    makeInlineStyles("verticalAlignTop")(contents)
  )
  .add("vertical align bottom", () =>
    makeInlineStyles("verticalAlignBottom")(contents)
  );

storiesOf("column 방향", module)
  .add("기본 스타일", () => makeInlineStyles("columnBase")(contents))
  .add("align center column base", () =>
    makeInlineStyles("alignCenterColumnBase")(contents)
  )
  .add("align right column base", () =>
    makeInlineStyles("alignRightColumnBase")(contents)
  )
  .add("vertical align top column base", () =>
    makeInlineStyles("verticalAlignTopColumnBase")(contents)
  )
  .add("vertical align bottom column base", () =>
    makeInlineStyles("verticalAlignBottomColumnBase")(contents)
  );
