
import { all, fork } from 'redux-saga/effects'

export const combineSagas = (sagas) =>
  function * rootSaga () {
    try {
      yield all(sagas.map(fork))
    } catch (err) {
      console.error(err)
    }
  }
