import { URL } from 'whatwg-url'

/**
 * 
 * @param {Request} request The original request
 * @returns Response
 */
export const handleHttpRequest = async (request) => {
  const currentUrl = new URL(request.url)
  const newUrl = new URL(currentUrl.pathname, ['localhost', '127.0.0.1'].includes(currentUrl.hostname) ? 'https://se-apps-ef-graphql-response-default.edgio.link' : currentUrl.origin)

  const newRequest = new Request(newUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: await request.arrayBuffer()
  })

  const response = await fetch(newRequest, {
    edgio: {
      origin: 'origin'
    }
  })

  const isCacheable = response.headers.get('x-cacheable')
  if (isCacheable === 'true') {
    response.headers.set('cache-control', 's-maxage=600')
  } else {
    response.headers.set('cache-control', 'no-cache')
  }

  return response
}
