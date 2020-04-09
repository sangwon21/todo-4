import { div, span, i, textarea } from "wonnie-template";
import { Modal } from "../../../Modal";
import { CustomButton, ButtonSize, ButtonType } from "../../../CustomButton";
import COLOR from "../../../../util/color";
import {
  InlineList,
  InlineListClass,
} from "../../../../styled-component/InlineList";

import "./EditModal.scss";

export interface EditModalConstructor {
  noteContent: string;
  editContent: Function;
}

export class EditModal {
  private noteContent: string;
  private editContent: Function;
  private textareaNode: Element | Text | null;
  private editModalNode: Element | Text | null;
  constructor(param: EditModalConstructor) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.noteContent = param.noteContent;
    this.editContent = param.editContent;
    this.textareaNode = null;
    this.editModalNode = null;
  }

  close() {
    this.editModalNode!.remove();
  }

  handleSubmit() {
    const { value } = this.textareaNode! as HTMLTextAreaElement;
    this.editContent(value);
    this.close();
  }

  render() {
    const leftHeader = span({ class: "edit-modal-header-title" })([
      "Edit note",
    ]);
    const rightHeader = i({ class: "close icon", onClick: this.close })();

    const editModalHeader = InlineList({
      class: InlineListClass.SPACE_BETWEEN,
      width: "100%",
      userClassList: ["edit-modal-header"],
    })([leftHeader, rightHeader]);

    const editModalNoteHeader = span()(["Note"]);

    this.textareaNode = textarea({
      class: "edit-modal-textarea",
      maxlength: "500",
      placeholder: `${this.noteContent}`,
    })([]);

    const mediumSettings: ButtonType = {
      size: ButtonSize.medium,
      color: COLOR.PRIMARY,
      content: "제출",
      contentColor: COLOR.WHITE,
      callback: this.handleSubmit,
    };

    const saveNoteButton = CustomButton(mediumSettings);

    const editModalNote = InlineList({
      class: InlineListClass.SPACE_BETWEEN_COLUMN,
      width: "100%",
      userClassList: ["edit-modal-note"],
    })([editModalNoteHeader, this.textareaNode, saveNoteButton]);

    const ModalContent = InlineList({
      class: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["modal-content"],
    })([editModalHeader, editModalNote]);
    this.editModalNode = Modal(ModalContent);
    return this.editModalNode;
  }
}
