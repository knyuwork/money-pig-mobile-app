// @flow

import axios from 'axios'

export const metatraderApiInstance = axios.create({
  baseURL: 'https://www.mql5.com/en',
  timeout: 10000,
})
