import { div, i, span } from "wonnie-template";
import { Modal } from "../../../Modal";
import { CustomButton, ButtonSize, ButtonType } from "../../../CustomButton";
import COLOR from "../../../../util/color";
import {
  InlineList,
  InlineListClass,
} from "../../../../styled-component/InlineList";

import "./FailModal.scss";

export class FailModal {
  private failModalNode: Element | Text | null = null;
  constructor() {
    this.close = this.close.bind(this);
  }

  close() {
    this.failModalNode!.remove();
  }

  render() {
    const leftHeader = span({ class: "fail-modal-header-title" })(["실패"]);
    const rightHeader = i({ class: "close icon", onClick: this.close })();

    const header = InlineList({
      className: InlineListClass.SPACE_BETWEEN,
      width: "100%",
      userClassList: ["fail-modal-header"],
    })([leftHeader, rightHeader]);

    const contents = div({ class: "fail-modal-text" })([
      "다시 한 번 시도해주세요",
    ]);

    const mediumSettings: ButtonType = {
      size: ButtonSize.medium,
      color: COLOR.PRIMARY,
      content: "close",
      contentColor: COLOR.WHITE,
      callback: this.close,
    };

    const closeButton = InlineList({
      className: InlineListClass.ALIGN_RIGHT,
      userClassList: ["fail-modal-button"],
    })([CustomButton(mediumSettings)]);

    const ModalContent = InlineList({
      className: InlineListClass.SPACE_BETWEEN_COLUMN,
      userClassList: ["fail-modal-content"],
    })([header, contents, closeButton]);
    this.failModalNode = Modal(ModalContent);
    return this.failModalNode;
  }
}
