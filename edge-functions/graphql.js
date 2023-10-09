/**
 * 
 * @param {Request} request The original request
 * @returns Response
 */
export const handleHttpRequest = async (request) => {
  return new Response(JSON.stringify({
    "post": {
      "id": "1",
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  }), {
    headers: {
      'X-GraphQL-Keys': 'graphql:Query',
      'content-type': 'application/json'
    },
    status: 290
  })
}