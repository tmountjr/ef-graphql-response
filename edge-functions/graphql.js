/**
 * 
 * @param {Request} request The original request
 * @returns Response
 */
export const handleHttpRequest = async (request) => {
  const body = await request.text()
  const resp = await fetch('https://graphqlzero.almansi.me/api', {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    edgio: {
      origin: 'origin'
    }
  })

  const respBody = await resp.text()
  return new Response(respBody, {
    headers: {
      'x-graphql-keys': 'graphql:Query',
      'content-type': 'application/json'
    },
    status: 290
  })
}