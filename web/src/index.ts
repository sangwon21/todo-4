import { div } from "wonnie-template";
import { Board } from "./component/Board";
import { Header } from "./component/Header";

import "./index.scss";
import "./util/style/semantic-ui/icon.css";
import "./util/style/reset.scss";

const board = new Board().render();

const root = div({ id: "root" })();
const body = document.querySelector("body")!;
body.appendChild(root);
root.appendChild(div()([new Header().render(), board]));
