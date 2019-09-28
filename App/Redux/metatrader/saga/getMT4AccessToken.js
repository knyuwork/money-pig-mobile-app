import { select } from "redux-saga/effects";

export function* getMT4AccessToken() {
  try {
    yield select();
  } catch (error) {
    console.log(error);
  }
}
