import fetch from 'isomorphic-unfetch'
import { emitter, EVENTS } from './emitter'

export type FetcherError = Error & { response: Response }

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)
  if (res.ok) {
    return res.json()
  }
  const error = new Error(res.statusText) as FetcherError
  error.response = res

  emitter.emit(EVENTS.API_ERROR, {
    input,
    status: res.status,
    statusText: res.statusText,
    response: res,
  })

  return Promise.reject(error)
}
