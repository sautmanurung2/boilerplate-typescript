import { Repository } from 'typeorm';
import { ExampleDatabaseEntity } from '../database/entities/ExampleDatabaseEntity';
import { ExampleEntity } from '../../domains/entity/ExampleEntity';
import { AppDataSource } from '../database/database';

export class ExampleRepository {
    private repository: Repository<ExampleDatabaseEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(ExampleDatabaseEntity)
    }

    async create(example: ExampleEntity): Promise<ExampleEntity> {
        const dbEntity = this.toDatabaseEntity(example)
        const savedEntity = await this.repository.save(dbEntity)
        return this.toDomainEntity(savedEntity)
    }

    async findById(id: string): Promise<ExampleEntity | null> {
        const dbEntity = await this.repository.findOneBy({ id })
        return dbEntity ? this.toDomainEntity(dbEntity) : null
    }

    async findAll(): Promise<ExampleEntity[]> {
        const dbEntities = await this.repository.find()
        return dbEntities.map(this.toDomainEntity)
    }

    async update(example: ExampleEntity): Promise<ExampleEntity> {
        const dbEntity = this.toDatabaseEntity(example)
        const updateEntity = await this.repository.save(dbEntity)
        return this.toDomainEntity(updateEntity)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id })
    }

    private toDomainEntity(dbEntity: ExampleDatabaseEntity): ExampleEntity {
        return new ExampleEntity({
            id: dbEntity.id,
            name: dbEntity.name,
            description: dbEntity.description,
            createdAt: dbEntity.createdAt,
            updatedAt: dbEntity.updatedAt,
        })
    }


    private toDatabaseEntity(example: ExampleEntity): ExampleDatabaseEntity {
        const dbEntity = new ExampleDatabaseEntity();
        dbEntity.id = example.id;
        dbEntity.name = example.name;
        dbEntity.description = example.description;
        dbEntity.createdAt = example.createdAt || new Date();
        dbEntity.updatedAt = example.updatedAt || new Date();
        return dbEntity;
    }
}