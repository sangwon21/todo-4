import { InlineList, InlineListClass } from "../../styled-component/InlineList";

import "./Modal.scss";

export const Modal = (ModalContent: Element | Text | (Element | Text)[]) => {
  if (Array.isArray(ModalContent)) {
    return InlineList({
      className: InlineListClass.CENTER,
      userClassList: ["modal"],
    })(ModalContent);
  }
  return InlineList({
    className: InlineListClass.CENTER,
    userClassList: ["modal"],
  })([ModalContent]);
};
