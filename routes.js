import { Router, edgioRoutes } from '@edgio/core'

export default new Router()
  .use(edgioRoutes)
  .post('/api', {
    edge_function: './edge-functions/graphql.js'
  })
  .if(
    and(
      { method: "POST" },
      { path: "/api" },
      { edgeControlCriteria: { "===": [{ response: "status_code" }, "290"] } }
    ),
    {
      caching: { enable_caching_for_methods: ["POST"] },
      headers: { add_response_headers: { "x-foo": "bar" } },
    }
  )