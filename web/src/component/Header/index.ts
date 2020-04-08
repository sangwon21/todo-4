import { div, header } from "wonnie-template";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";
import {
  Spacing,
  ISpacingStyleParameter,
} from "../../styled-component/Spacing";

const leftMargin: ISpacingStyleParameter = {
  left: 2,
};

const rightMargin: ISpacingStyleParameter = {
  right: 2,
};

const service = Spacing(leftMargin)(
  div({ style: "color: #ffffff; font-size: 2rem;" })(["TODO 서비스"])
);
const menu = Spacing(rightMargin)(
  div({ style: "color: #ffffff; text-align: right;" })(["menu"])
);

export const Header = header({
  style: "background-color: #000000; height: 4rem; font-size: 1rem;",
})([
  InlineList({ class: InlineListClass.SPACE_BETWEEN, height: "100%" })([
    service,
    menu,
  ]),
]);
