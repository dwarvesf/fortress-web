import fetch from 'isomorphic-unfetch'

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
  // Parse error from the response
  const detailError = await res.json()
  error.message = detailError?.error || error.message

  return Promise.reject(error)
}
