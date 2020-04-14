import { span, i, textarea } from "wonnie-template";
import { Modal } from "../../../Modal";
import { CustomButton, ButtonSize, ButtonType } from "../../../CustomButton";
import COLOR from "../../../../util/color";
import {
  InlineList,
  InlineListClass,
} from "../../../../styled-component/InlineList";

import "./EditModal.scss";

export interface IEditModalState {
  noteContent: string;
  editContent: Function;
}

export class EditModal {
  private state: IEditModalState = {
    noteContent: "",
    editContent: () => {},
  };
  private textareaNode: Element | Text | null = null;
  private editModalNode: Element | Text | null = null;
  constructor(param: IEditModalState) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.state.noteContent = param.noteContent;
    this.state.editContent = param.editContent;
  }

  close() {
    this.editModalNode!.remove();
  }

  handleSubmit() {
    const { value } = this.textareaNode! as HTMLTextAreaElement;
    this.state.editContent(value);
    this.close();
  }

  render() {
    const leftHeader = span({ class: "edit-modal-header-title" })([
      "Edit note",
    ]);
    const rightHeader = i({ class: "close icon", onClick: this.close })();

    const editModalHeader = InlineList({
      className: InlineListClass.SPACE_BETWEEN,
      width: "100%",
      userClassList: ["edit-modal-header"],
    })([leftHeader, rightHeader]);

    const editModalNoteHeader = span()(["Note"]);

    this.textareaNode = textarea({
      class: "edit-modal-textarea",
      maxlength: "15",
      placeholder: `${this.state.noteContent}`,
    })([]);

    const mediumSettings: ButtonType = {
      size: ButtonSize.medium,
      color: COLOR.PRIMARY,
      content: "Save Note",
      contentColor: COLOR.WHITE,
      callback: this.handleSubmit,
    };

    const saveNoteButton = CustomButton(mediumSettings);

    const editModalNote = InlineList({
      className: InlineListClass.SPACE_BETWEEN_COLUMN,
      width: "100%",
      userClassList: ["edit-modal-note"],
    })([editModalNoteHeader, this.textareaNode, saveNoteButton]);

    const ModalContent = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["edit-modal-content"],
    })([editModalHeader, editModalNote]);
    this.editModalNode = Modal(ModalContent);
    return this.editModalNode;
  }
}
