import { Router, edgioRoutes, and } from '@edgio/core'

export default new Router()
  .use(edgioRoutes)
  .if(
    and(
      { method: "POST" },
      { path: "/api" },
      { edgeControlCriteria: { "===": [{ response: "status_code" }, "290"] } }
    ),
    {
      caching: {
        enable_caching_for_methods: ["POST"]
      },
      headers: {
        add_response_headers: { "x-foo": "bar" }
      },
      response: {
        set_status_code: 200
      }
    }
  )
  .post('/api', {
    edge_function: './edge-functions/graphql.js'
  })