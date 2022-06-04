import { Router } from 'express'
import * as controllers from './../../controllers/user.controller'
import authenticationMiddleware from './../../middleware/authentication.middleware'

const routes = Router()

routes
  .route('/')
  .get(authenticationMiddleware, controllers.getMany)
  .post(controllers.create)
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.update)
  .delete(controllers.deleteUser)

// authentication
routes.route('/authenticate').post(controllers.authenticate)
export default routes
