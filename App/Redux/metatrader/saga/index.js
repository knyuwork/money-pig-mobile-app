import { all, takeLatest } from "redux-saga/effects";

import { ACTION_TYPES } from "../actions";
import { getMT4AccessToken } from "./getMT4AccessToken";

export function* appSaga() {
  try {
    yield all([
      takeLatest(ACTION_TYPES.GET_MT4_ACCESS_TOKEN, getMT4AccessToken)
    ]);
  } catch (error) {
    console.log(error);
  }
}
