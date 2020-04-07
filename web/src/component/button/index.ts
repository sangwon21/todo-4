import { button } from "wonnie-template";

export enum ButtonStatus {
  primary = "#cce5ff",
  secondary = "#e2e3e5",
  success = "#d4edda",
  danger = "#f8d7da",
  warning = "#FFF3CD",
  info = "#d1ecf1",
  light = "#e8eff2",
  dark = "#1f2021",
}

export enum ButtonSize {
  large = "30rem",
  medium = "15rem",
  small = "5rem",
}

export interface ButtonType {
  size: ButtonSize;
  color: ButtonStatus;
  callback: Function;
  content: string;
  contentColor: ButtonStatus;
}

export const customSubmitButton = (submitButton: ButtonType) =>
  button({
    onSubmit: submitButton.callback,
    type: "submit",
    style: `background-color: ${submitButton.color}; color: ${submitButton.contentColor}; width: ${submitButton.size}; height: 3rem`,
  })([submitButton.content]);

export const customButton = (buttonParam: ButtonType) =>
  button({
    onClick: buttonParam.callback,
    type: "button",
    style: `background-color: ${buttonParam.color}; color: ${buttonParam.contentColor}; width: ${buttonParam.size}; height: 3rem`,
  })([buttonParam.content]);
