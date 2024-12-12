import { Request, Response } from 'express';
import { ExampleService } from '../service/ExampleService';
import httpStatus from 'http-status'

export class ExampleController {
    private service: ExampleService

    constructor(service: ExampleService) {
        this.service = service
    }

    async createExample(req: Request, res: Response): Promise<void> {
        const { name, description } = req.body
        const result = await this.service.createExample({ name, description})
        res.status(httpStatus.CREATED).send(result)
    }

    async getExampleById(req: Request, res: Response): Promise<void> {
        const result = await this.service.getExampleById(req.params.id)
        res.send(result)
    }

    async getAllExamples(req: Request, res: Response): Promise<void> {
        const result = await this.service.getAllExamples()
        res.send(result)
    }

    async updateExample(req: Request, res: Response): Promise<void> {
        const { name, description } = req.body
        const result = await this.service.updateExample(req.params.id, { name, description })
        res.send(result)
    }

    async deleteExample(req: Request, res: Response): Promise<void> {
        await this.service.deleteExample(req.params.id)
        res.status(httpStatus.NO_CONTENT).send()
    }
}