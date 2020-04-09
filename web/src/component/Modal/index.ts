import { InlineList, InlineListClass } from "../../styled-component/InlineList";

import "./Modal.scss";

export const Modal = (ModalContent: Element | Text | (Element | Text)[]) => {
  if (Array.isArray(ModalContent)) {
    return InlineList({
      class: InlineListClass.CENTER,
      userClassList: ["modal"],
    })(ModalContent);
  }
  return InlineList({
    class: InlineListClass.CENTER,
    userClassList: ["modal"],
  })([ModalContent]);
};
