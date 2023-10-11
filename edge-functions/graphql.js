import { URL } from 'whatwg-url'

/**
 * 
 * @param {Request} request The original request
 * @returns Response
 */
export const handleHttpRequest = async (request) => {
  const currentUrl = new URL(request.url)
  const newUrl = new URL(currentUrl.pathname, ['localhost', '127.0.0.1'].includes(currentUrl.hostname) ? 'https://graphqlzero.almansi.me' : currentUrl.origin)

  const newRequest = new Request(newUrl.toString(), {
    method: request.method,
    headers: {
      ...request.headers,
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: await request.arrayBuffer()
  })

  const response = await fetch(newRequest, {
    edgio: {
      origin: 'origin'
    }
  })

  // Check if this was a query or a mutation
  const reqBody = await request.json()
  const isMutation = 'mutation' in reqBody

  if (!isMutation ) {
    response.headers.set('cache-control', 's-maxage=600')
  } else {
    response.headers.set('cache-control', 'no-cache')
  }

  return response
}
