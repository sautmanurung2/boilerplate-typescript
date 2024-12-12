import { ExampleEntity } from "../../domains/entity/ExampleEntity";
import type { ExampleRepository } from "../../infrastructure/repository/ExampleRepository";

export class ExampleService {
  private repository: ExampleRepository;

  constructor(repository: ExampleRepository) {
    this.repository = repository;
  }

  async createExample(data: {
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Promise<ExampleEntity> {
    const entity = ExampleEntity.create(data);
    return this.repository.create(entity);
  }

  async getExampleById(id: string): Promise<ExampleEntity | null> {
    return this.repository.findById(id);
  }

  async getAllExamples(): Promise<ExampleEntity[]> {
    return this.repository.findAll();
  }

  async updateExample(id: string, updates: { name?: string; description?: string }): Promise<ExampleEntity | null> {
    const entity = await this.repository.findById(id);
    if (!entity) return null;

    if (updates.name) entity.updateName(updates.name);
    if (updates.description) entity.updateDescription(updates.description);

    return this.repository.update(entity);
  }

  async deleteExample(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
