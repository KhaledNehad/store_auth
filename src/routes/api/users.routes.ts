import { Router } from 'express'
import * as controllers from './../../controllers/user.controller'

const routes = Router()

routes.route('/').get(controllers.getMany).post(controllers.create)
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.update)
  .delete(controllers.deleteUser)

// authentication
routes.route('/authenticate').post(controllers.authenticate)
export default routes
