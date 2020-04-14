import { div, textarea } from "wonnie-template";
import { CustomButton, ButtonType } from "../../CustomButton";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";

import "./AddingCard.scss";

export interface AddingCardParam {
  rightButtonType: ButtonType;
  leftButtonType: ButtonType;
  userClass: string;
}

export class AddingCard {
  private rightButtonType: ButtonType;
  private leftButtonType: ButtonType;
  private userClass: string;

  constructor(param: AddingCardParam) {
    this.rightButtonType = param.rightButtonType;
    this.leftButtonType = param.leftButtonType;
    this.userClass = param.userClass;
  }

  render() {
    const buttons = InlineList({
      class: InlineListClass.SPACE_BETWEEN,
      width: "100%",
    })([CustomButton(this.leftButtonType), CustomButton(this.rightButtonType)]);

    const cardTextarea = div({ style: "width: 100%; height: 50%;" })([
      textarea({
        class: "textarea card-textarea",
      })(),
    ]);

    return InlineList({
      class: InlineListClass.SPACE_BETWEEN_COLUMN,
      width: "100%",
      height: "8rem",
      userClassList: ["adding-card", this.userClass],
    })([cardTextarea, buttons]);
  }
}
