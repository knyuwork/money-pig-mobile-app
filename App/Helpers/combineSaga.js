
import { all, fork } from 'redux-saga/effects'

export const combineSagas = (sagas) =>
  function * rootSaga () {
    console.log(sagas)
    try {
      yield all(sagas.map(fork))
    } catch (err) {
      console.error(err)
    }
  }
