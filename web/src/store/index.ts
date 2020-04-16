import { createStore, Action } from "redux";
import { ADD_LOG_HISTORY } from "./action/logHistory";

interface ILogHistoryState {
  history: string[];
}

interface ILogHistoryAction extends Action {
  userAction: string;
  contents: string;
  suffix?: string;
}

const initialState: ILogHistoryState = {
  history: [],
};

const logHistoryManagement = (
  state = initialState,
  action: ILogHistoryAction
) => {
  switch (action.type) {
    case ADD_LOG_HISTORY:
      const log = action.suffix
        ? `${action.userAction} ${action.contents} ${action.suffix}`
        : `${action.userAction} ${action.contents}`;
      return { history: [...state.history, log] };
    default:
      return state;
  }
};

const store = createStore(logHistoryManagement);

export default store;
