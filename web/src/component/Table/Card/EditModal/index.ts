import { div, span, i, textarea } from "wonnie-template";
import { Modal } from "../../../Modal";
import { CustomButton, ButtonSize, ButtonType } from "../../../CustomButton";
import COLOR from "../../../../util/color";
import {
  InlineList,
  InlineListClass,
} from "../../../../styled-component/InlineList";
import "./EditModal.scss";

export class EditModal {
  constructor() {}

  render() {
    const leftHeader = span({ class: "edit-modal-header-title" })([
      "Edit note",
    ]);
    const rightHeader = i({ class: "close icon" })();

    const editModalHeader = InlineList({
      class: InlineListClass.SPACE_BETWEEN,
      width: "100%",
      userClassList: ["edit-modal-header"],
    })([leftHeader, rightHeader]);

    const editModalNoteHeader = span()(["Note"]);

    const editModalNoteTextarea = textarea({
      class: "edit-modal-textarea",
      maxlength: "500",
    })([]);

    const mediumSettings: ButtonType = {
      size: ButtonSize.medium,
      color: COLOR.PRIMARY,
      content: "제출",
      contentColor: COLOR.WHITE,
    };

    const saveNoteButton = CustomButton(mediumSettings);

    const editModalNote = InlineList({
      class: InlineListClass.SPACE_BETWEEN_COLUMN,
      width: "100%",
      userClassList: ["edit-modal-note"],
    })([editModalNoteHeader, editModalNoteTextarea, saveNoteButton]);

    const ModalContent = InlineList({
      class: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["modal-content"],
    })([editModalHeader, editModalNote]);
    return Modal(ModalContent);
  }
}
