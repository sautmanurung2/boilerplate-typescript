import { randomUUID } from "node:crypto";
import express from "express";
import httpStatus from "http-status";
import request from "supertest";
import { ExampleController } from "../../application/controllers/ExampleController";
import { ExampleService } from "../../application/service/ExampleService";
import { ExampleEntity } from "../../domains/entity/ExampleEntity";
import { ExampleRepository } from "../../infrastructure/repository/ExampleRepository";

jest.mock("../../application/service/ExampleService");

describe("ExampleController", () => {
  let app: express.Application;
  let exampleService: ExampleService;

  beforeEach(() => {
    exampleService = new ExampleService(new ExampleRepository());

    const controller = new ExampleController(exampleService);

    app = express();
    app.use(express.json());
    app.post("/examples", controller.createExample.bind(controller));
    app.get("/examples/:id", controller.getExampleById.bind(controller));
    app.get("/examples", controller.getAllExamples.bind(controller));
    app.put("/examples/:id", controller.updateExample.bind(controller));
    app.delete("/examples/:id", controller.deleteExample.bind(controller));
  });

  it("should create an example", async () => {
    const mockExampleEntity = new ExampleEntity({
      id: randomUUID.toString(), // Change id to _id
      name: "Example",
      description: "Example description",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockCreateExample = jest.spyOn(exampleService, "createExample").mockResolvedValue(mockExampleEntity);

    const response = await request(app).post("/examples").send({
      name: "Test Example",
      description: "Description",
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toHaveProperty("_id");
    expect(mockCreateExample).toHaveBeenCalledTimes(1);
    expect(exampleService.createExample).toHaveBeenCalledWith({
      name: "Test Example",
      description: "Description",
    });
  });

  it("should get an example by id", async () => {
    const mockExampleEntity = new ExampleEntity({
      id: randomUUID.toString(), // Change id to _id
      name: "Example",
      description: "Example description",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockGetExampleById = jest.spyOn(exampleService, "getExampleById").mockResolvedValue(mockExampleEntity);

    const response = await request(app).get("/examples/1");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty("_id");
    expect(mockGetExampleById).toHaveBeenCalledWith("1");
    expect(exampleService.getExampleById).toHaveBeenCalledWith("1");
  });

  it("should get all examples", async () => {
    const mockExampleEntity = new ExampleEntity({
      id: randomUUID.toString(), // Change id to _id
      name: "Example",
      description: "Example description",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockGetAllExamples = jest.spyOn(exampleService, "getAllExamples").mockResolvedValue([mockExampleEntity]);

    const response = await request(app).get("/examples");

    expect(response.status).toBe(httpStatus.OK);
    expect(mockGetAllExamples).toHaveBeenCalled();
    expect(exampleService.getAllExamples).toHaveBeenCalled();
  });

  it("should update an example", async () => {
    const mockExampleEntity = new ExampleEntity({
      id: randomUUID.toString(), // Change id to _id
      name: "Example",
      description: "Example description",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockUpdateExample = jest.spyOn(exampleService, "updateExample").mockResolvedValue(mockExampleEntity);

    const response = await request(app).put("/examples/1").send({
      name: "Updated Example",
      description: "Updated Description",
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty("_id");
    expect(mockUpdateExample).toHaveBeenCalledWith("1", {
      name: "Updated Example",
      description: "Updated Description",
    });
    expect(exampleService.updateExample).toHaveBeenCalledWith("1", {
      name: "Updated Example",
      description: "Updated Description",
    });
  });

  it("should delete an example", async () => {
    const mockDeleteExample = jest.spyOn(exampleService, "deleteExample").mockResolvedValue(undefined);

    const response = await request(app).delete("/examples/1");

    expect(response.status).toBe(httpStatus.NO_CONTENT);
    expect(mockDeleteExample).toHaveBeenCalledWith("1");
    expect(exampleService.deleteExample).toHaveBeenCalledWith("1");
  });
});
