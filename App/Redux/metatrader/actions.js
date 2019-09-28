import { createAction } from "redux-actions";

const PREFIX = "METATRADER";

export const ACTION_TYPES = {
  GET_MT4_ACCESS_TOKEN: `${PREFIX}/GET_MT4_ACCESS_TOKEN`
};

export const getMT4AccessToken = createAction(
  ACTION_TYPES.GET_MT4_ACCESS_TOKEN
);
