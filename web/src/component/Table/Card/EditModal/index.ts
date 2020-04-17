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
  private saveNoteButton: Element | Text | null = null;
  private modalContentNode: Element | Text | null = null;
  constructor(param: IEditModalState) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.close = this.close.bind(this);
    this.state.noteContent = param.noteContent;
    this.state.editContent = param.editContent;
  }

  close() {
    this.editModalNode!.remove();
  }

  handleSubmit() {
    const { value } = this.textareaNode! as HTMLTextAreaElement;
    if (value === "") {
      return;
    }
    this.close();
    this.state.editContent(value);
  }

  handleInput(e: InputEvent) {
    const { value } = e.target as HTMLTextAreaElement;
    if (value === "") {
      (this.saveNoteButton as Element).setAttribute(
        "style",
        `background-color: ${COLOR.INVALID_PRIMARY}; color: ${COLOR.WHITE}; width: 10rem; height: 2rem`
      );
      return;
    }
    (this.saveNoteButton as Element).setAttribute(
      "style",
      `background-color: ${COLOR.PRIMARY}; color: ${COLOR.WHITE}; width: 10rem; height: 2rem`
    );
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
      onInput: this.handleInput,
    })([]);

    const mediumSettings: ButtonType = {
      size: ButtonSize.medium,
      color: COLOR.INVALID_PRIMARY,
      content: "Save Note",
      contentColor: COLOR.WHITE,
      callback: this.handleSubmit,
    };

    this.saveNoteButton = CustomButton(mediumSettings);

    const editModalNote = InlineList({
      className: InlineListClass.SPACE_BETWEEN_COLUMN,
      width: "100%",
      userClassList: ["edit-modal-note"],
    })([editModalNoteHeader, this.textareaNode, this.saveNoteButton]);

    this.modalContentNode = InlineList({
      className: InlineListClass.ALIGN_LEFT_COLUMN,
      userClassList: ["edit-modal-content", "modal-skew-from-left"],
      attributes: {
        draggable: "false",
      },
    })([editModalHeader, editModalNote]);
    this.editModalNode = Modal(this.modalContentNode);
    return this.editModalNode;
  }
}
