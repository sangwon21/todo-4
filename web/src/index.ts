import { div } from "wonnie-template";
import { Board } from "./component/Board";
import { Header } from "./component/Header";

import "./index.scss";
import "./util/style/semantic-ui/icon.css";
import "./util/style/reset.scss";

const board = new Board().render();

const root = div({ id: "root" })();
const body = document.querySelector("body")!;

const mount = (to: Element, target: Element) => {
  to.appendChild(target);
};

mount(body, root as Element);
mount(root as Element, div()([new Header().render(), board]) as Element);
