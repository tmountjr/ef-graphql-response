import { Router, edgioRoutes } from '@edgio/core'

export default new Router()
  .match('/api/:splat*', {
    origin: {
      set_origin: 'origin'
    }
  })
  .use(edgioRoutes)
