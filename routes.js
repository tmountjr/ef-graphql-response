import { Router, edgioRoutes } from '@edgio/core'

export default new Router()
  .use(edgioRoutes)
  .post('/api', {
    caching: {
      enable_caching_for_methods: ["POST"]
    },
    edge_function: './edge-functions/graphql.js'
  })
  