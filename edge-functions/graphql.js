/**
 * 
 * @param {Request} request The original request
 * @returns Response
 */
export const handleHttpRequest = async (request) => {
  const headers = new Headers()
  const notAllowed = ['content-length', 'host']
  for (const h of request.headers.entries()) {
    if (notAllowed.includes(h[0].toLowerCase())) continue
    headers.append(h[0], h[1])
  }
  const newRequest = new Request(request.url, {
    method: request.method,
    headers,
    body: await request.arrayBuffer()
  })

  const response = await fetch(newRequest, {
    edgio: {
      origin: 'origin'
    }
  })

  // Check if this was a query or a mutation
  // Query json: {"query": "query {\n..."}
  // Mutation json: {"query": "mutation (\n..."}
  const reqBody = await request.json()
  const isMutation = reqBody.query?.startsWith('mutation (')

  if (isMutation ) {
    response.headers.set('cache-control', 'no-cache')
  } else {
    response.headers.set('cache-control', 's-maxage=600')
  }

  return response
}
