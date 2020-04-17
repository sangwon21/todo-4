import { createStore, Action } from "redux";
import { ADD_LOG_HISTORY } from "./action/logHistory";

interface ILogHistoryAction extends Action {
  userAction: string;
  contents: string;
  suffix?: string;
  historyCreatedTime: string;
}

interface ILogHistoryType {
  userAction: string;
  contents: string;
  suffix?: string;
  historyCreatedTime: string;
}

interface ILogHistoryState {
  history: ILogHistoryType[];
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
      return {
        history: [
          ...state.history,
          {
            userAction: action.userAction,
            contents: action.contents,
            suffix: action.suffix,
            historyCreatedTime: action.historyCreatedTime,
          },
        ],
      };
    default:
      return state;
  }
};

const store = createStore(logHistoryManagement);

export default store;
