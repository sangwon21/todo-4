import { div, i, textarea } from "wonnie-template";
import { CustomSubmitButton, ButtonSize, ButtonType } from "../CustomButton";
import COLOR from "../../util/color";
import { InlineList, InlineListClass } from "../../styled-component/InlineList";

import "./AddingCard.scss";

const cardTextarea = div({ style: "width: 100%; height: 50%;" })([
  textarea({
    class: "textarea card-textarea",
  })(),
]);

const rightButtonType: ButtonType = {
  size: ButtonSize.large,
  color: COLOR.SECONDARY,
  content: "Cancel",
  contentColor: COLOR.FONT,
};

const leftButtonType: ButtonType = {
  size: ButtonSize.large,
  color: COLOR.PRIMARY,
  content: "Add",
  contentColor: COLOR.WHITE,
};

const buttons = InlineList({
  class: InlineListClass.SPACE_BETWEEN,
  width: "100%",
})([CustomSubmitButton(leftButtonType), CustomSubmitButton(rightButtonType)]);

export const AddingCard = InlineList({
  class: InlineListClass.SPACE_BETWEEN_COLUMN,
  width: "21rem",
  height: "8rem",
})([cardTextarea, buttons]);
