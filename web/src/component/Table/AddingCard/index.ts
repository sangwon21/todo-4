import { div, textarea } from "wonnie-template";
import { CustomButton, ButtonType } from "../../CustomButton";
import COLOR from "../../../util/color";
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
  private leftButtonNode: Element | Text;
  private rightButtonNode: Element | Text;
  private textareaNode: Element | Text | null = null;
  private userClass: string;

  constructor(param: AddingCardParam) {
    this.leftButtonNode = CustomButton(param.leftButtonType);
    this.rightButtonNode = CustomButton(param.rightButtonType);
    this.handleTextareaInput = this.handleTextareaInput.bind(this);
    this.userClass = param.userClass;
  }

  handleTextareaInput(e: InputEvent) {
    const { value } = e.target as HTMLTextAreaElement;
    if (value !== "") {
      (this.leftButtonNode as Element).setAttribute(
        "style",
        `background-color: ${COLOR.PRIMARY}; color: ${COLOR.WHITE}; width: 10rem; height: 2rem`
      );
      return;
    }
    (this.leftButtonNode as Element).setAttribute(
      "style",
      `background-color: ${COLOR.INVALID_PRIMARY}; color: ${COLOR.WHITE}; width: 10rem; height: 2rem`
    );
  }

  render() {
    const buttons = InlineList({
      className: InlineListClass.SPACE_BETWEEN,
      width: "100%",
    })([this.leftButtonNode, this.rightButtonNode]);

    this.textareaNode = div({ style: "width: 100%; height: 50%;" })([
      textarea({
        class: "textarea card-textarea",
        onInput: this.handleTextareaInput,
      })(),
    ]);

    return InlineList({
      className: InlineListClass.SPACE_BETWEEN_COLUMN,
      width: "100%",
      height: "8rem",
      userClassList: ["adding-card", this.userClass],
    })([this.textareaNode, buttons]);
  }
}
