/**
 * 
 * @param {Request} request The original request
 * @returns Response
 */
export const handleHttpRequest = async (request) => {
  const newRequest = new Request(request.url, {
    method: request.method,
    headers: request.headers,
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
