import { div } from "wonnie-template";
import { Board } from "./component/Board";
import { Header } from "./component/Header";
import axios from "axios";
import API from "./util/api";

import "./index.scss";
import "./util/style/semantic-ui/icon.css";
import "./util/style/reset.scss";

const root = div({ id: "root" })();
const body = document.querySelector("body")!;

const mount = (to: Element, target: Element) => {
  to.appendChild(target);
};

const getInitalData = async () => {
  const {
    data: { columns, history },
  } = await axios.get(API.GET_CARD_AND_HISTORY_DATA);
  const board = new Board(columns).render();

  mount(body, root as Element);
  mount(
    root as Element,
    div()([new Header(history).render(), board]) as Element
  );
};

getInitalData();
