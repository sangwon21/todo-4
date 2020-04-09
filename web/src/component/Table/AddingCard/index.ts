import { div, textarea } from "wonnie-template";
import { CustomButton, ButtonSize, ButtonType } from "../../CustomButton";
import COLOR from "../../../util/color";
import {
  InlineList,
  InlineListClass,
} from "../../../styled-component/InlineList";

import "./AddingCard.scss";

export interface AddingCardParam {
  rightButtonType?: ButtonType;
  leftButtonType?: ButtonType;
  rightButtonCallback?: Function;
  leftButtonCallback?: Function;
  userClass: string;
}

export class AddingCard {
  private rightButtonType: ButtonType;
  private leftButtonType: ButtonType;
  private userClass: string;

  constructor(param: AddingCardParam | void) {
    this.rightButtonType = (param && param.rightButtonType) || {
      size: ButtonSize.large,
      color: COLOR.SECONDARY,
      content: "Cancel",
      contentColor: COLOR.FONT,
      callback: (param && param.rightButtonCallback) || undefined,
    };
    this.leftButtonType = (param && param.leftButtonType) || {
      size: ButtonSize.large,
      color: COLOR.PRIMARY,
      content: "Add",
      contentColor: COLOR.WHITE,
      callback: (param && param.leftButtonCallback) || undefined,
    };

    this.userClass = param ? param.userClass : "";
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
