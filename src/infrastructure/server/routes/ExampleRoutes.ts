import express from 'express'
import validate from '../middleware/validate'
import { ExampleController } from '../../../application/controllers/ExampleController'
import { ExampleService } from '../../../application/service/ExampleService'
import { ExampleRepository } from '../../../infrastructure/repository/ExampleRepository'
import { ExampleValidations } from '../../../validations'

const router = express.Router()
const repository = new ExampleRepository()
const service = new ExampleService(repository)
const controllers = new ExampleController(service)

router.post('/', validate(ExampleValidations.createExample), controllers.createExample)
router.get('/', controllers.getAllExamples)
router.get('/:id', validate(ExampleValidations.getExampleById), controllers.getExampleById)
router.put('/:id', validate(ExampleValidations.updateExample), controllers.updateExample)
router.delete('/:id', validate(ExampleValidations.deleteExample), controllers.deleteExample)

export default router