import { randomUUID } from "node:crypto";
import type { Mocked } from "jest-mock";
import { ExampleService } from "../../application/service/ExampleService";
import { ExampleEntity } from "../../domains/entity/ExampleEntity";
import type { ExamplePropsInterface } from "../../domains/interfaces/ExampleInterfaces";
import type { ExampleRepository } from "../../infrastructure/repository/ExampleRepository";

jest.mock("../../domains/entity/ExampleEntity");
jest.mock("../../infrastructure/repository/ExampleRepository");

describe("ExampleService", () => {
  let exampleService: ExampleService;
  let repositoryMock: Mocked<ExampleRepository>;

  beforeEach(() => {
    // Mock implementation of ExampleRepository
    repositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as Mocked<ExampleRepository>;

    // Create instance of ExampleService with the mocked repository
    exampleService = new ExampleService(repositoryMock);
  });

  describe("createExample", () => {
    it("should create and return a new ExampleEntity", async () => {
      const data = { name: "Example", description: "Description" };
      const createdEntity = ExampleEntity.create(data);
      repositoryMock.create.mockResolvedValue(createdEntity);

      const result = await exampleService.createExample(data);

      expect(repositoryMock.create).toHaveBeenCalledWith(expect.objectContaining(data));
      expect(result).toBe(createdEntity);
    });
  });

  describe("getExampleById", () => {
    it("should return the ExampleEntity if it exists", async () => {
      const id = "123";
      const entity = new ExampleEntity({
        id,
        name: "Example",
        description: "Description",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      repositoryMock.findById.mockResolvedValue(entity);

      const result = await exampleService.getExampleById(id);

      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toBe(entity);
    });

    it("should return null if the entity does not exist", async () => {
      const id = "123";
      repositoryMock.findById.mockResolvedValue(null);

      const result = await exampleService.getExampleById(id);

      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe("getAllExamples", () => {
    it("should return all ExampleEntities", async () => {
      const entities = [
        new ExampleEntity({
          id: "1",
          name: "Example1",
          description: "Description1",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        new ExampleEntity({
          id: "2",
          name: "Example2",
          description: "Description2",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ];
      repositoryMock.findAll.mockResolvedValue(entities);

      const result = await exampleService.getAllExamples();

      expect(repositoryMock.findAll).toHaveBeenCalled();
      expect(result).toBe(entities);
    });
  });

  describe("updateExample", () => {
    it("should update and return the updated ExampleEntity", async () => {
      const id = "123";
      const updates: ExamplePropsInterface = {
        id,
        name: "Updated Example",
        description: "asdasdasd",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Create an existing entity with a random UUID
      const existingEntity = new ExampleEntity({
        id: randomUUID(), // Correct usage of randomUUID
        name: "updated name",
        description: "updated description",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Create the updated entity
      const updatedEntity = new ExampleEntity({
        ...existingEntity.toProps(), // Use existing entity's properties
        ...updates, // Apply the updates
      });

      // Mock repository methods
      repositoryMock.findById.mockResolvedValue(existingEntity);
      repositoryMock.update.mockResolvedValue(updatedEntity);

      const result = await exampleService.updateExample(id, updates);

      // Ensure that the repository's findById and update methods were called with the correct parameters
      expect(repositoryMock.findById).toHaveBeenCalledWith(id);
      //   expect(repositoryMock.update).toHaveBeenCalledWith(expect.objectContaining({
      //     id: updatedEntity.id,
      //     name: updatedEntity.name,
      //     description: updatedEntity.description,
      //     createdAt: updatedEntity.createdAt,
      //     updatedAt: updatedEntity.updatedAt,
      //   }));

      expect(result).toBe(updatedEntity);
    });
  });
});
