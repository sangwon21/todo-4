const API_DOMAIN = "http://3.34.24.75:8080";

const API = {
  GET_CARD_AND_HISTORY_DATA: `${API_DOMAIN}/api/columns/`,
  MAKE_NEW_CARD: (columnId: number) =>
    `${API_DOMAIN}/api/columns/${columnId}/cards/`,
  UPDATE_CARD: (columnId: number) =>
    `${API_DOMAIN}/api/columns/${columnId}/cards`,
  UPDATE_DRAGGED_CARD: (columnId: number) =>
    `${API_DOMAIN}/api/columns/${columnId}/cards/move`,
  REMOVE_CARD: (columnId: number) =>
    `${API_DOMAIN}/api/columns/${columnId}/cards`,
};

export default API;
