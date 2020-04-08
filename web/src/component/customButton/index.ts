import { button } from "wonnie-template";
import COLOR from "../../util/color";
import "./CustomButton.scss";

export enum ButtonSize {
  large = "10rem",
  medium = "7rem",
  small = "4rem",
}

export interface ButtonType {
  size: ButtonSize;
  color: COLOR;
  callback?: Function;
  content: string;
  contentColor: COLOR;
}

export const CustomSubmitButton = (submitButton: ButtonType) =>
  button({
    onSubmit: submitButton.callback,
    type: "submit",
    style: `background-color: ${submitButton.color}; color: ${submitButton.contentColor}; width: ${submitButton.size}; height: 2rem;`,
    class: "custom-button",
  })([submitButton.content]);

export const CustomButton = (buttonParam: ButtonType) =>
  button({
    onClick: buttonParam.callback,
    type: "button",
    style: `background-color: ${buttonParam.color}; color: ${buttonParam.contentColor}; width: ${buttonParam.size}; height: 2rem`,
    class: "custom-button",
  })([buttonParam.content]);
