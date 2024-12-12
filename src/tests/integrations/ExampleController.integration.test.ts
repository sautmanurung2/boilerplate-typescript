import http from "node:http";
import express, { type Express } from "express"; // Import Express type
import httpStatus from "http-status";
import request from "supertest";
import { ExampleController } from "../../application/controllers/ExampleController";
import type { ExampleService } from "../../application/service/ExampleService";

// Mock ExampleService
jest.mock("../../application/service/ExampleService");

const mockCreateExample = jest.fn();
const mockGetExampleById = jest.fn();
const mockGetAllExamples = jest.fn();
const mockUpdateExample = jest.fn();
const mockDeleteExample = jest.fn();

const mockService = {
  createExample: mockCreateExample,
  getExampleById: mockGetExampleById,
  getAllExamples: mockGetAllExamples,
  updateExample: mockUpdateExample,
  deleteExample: mockDeleteExample,
};

const app: Express = express(); // Explicitly type the app
app.use(express.json());
const controller = new ExampleController(mockService as unknown as ExampleService);

app.post("/examples", controller.createExample.bind(controller));
app.get("/examples/:id", controller.getExampleById.bind(controller));
app.get("/examples", controller.getAllExamples.bind(controller));
app.put("/examples/:id", controller.updateExample.bind(controller));
app.delete("/examples/:id", controller.deleteExample.bind(controller));

const server = http.createServer();
describe("ExampleController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an example", async () => {
    const mockResult = { id: "1", name: "Test Example", description: "Description" };
    mockCreateExample.mockResolvedValue(mockResult);

    const response = await request(server).post("/examples").send({
      name: "Test Example",
      description: "Description",
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(mockResult);
    expect(mockCreateExample).toHaveBeenCalledWith({
      name: "Test Example",
      description: "Description",
    });
  });

  it("should get an example by id", async () => {
    const mockResult = { id: "1", name: "Test Example", description: "Description" };
    mockGetExampleById.mockResolvedValue(mockResult);

    const response = await request(server).get("/examples/1");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(mockResult);
    expect(mockGetExampleById).toHaveBeenCalledWith("1");
  });

  it("should get all examples", async () => {
    const mockResult = [
      { id: "1", name: "Test Example 1", description: "Description 1" },
      { id: "2", name: "Test Example 2", description: "Description 2" },
    ];
    mockGetAllExamples.mockResolvedValue(mockResult);

    const response = await request(server).get("/examples");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(mockResult);
    expect(mockGetAllExamples).toHaveBeenCalled();
  });

  it("should update an example", async () => {
    const mockResult = { id: "1", name: "Updated Example", description: "Updated Description" };
    mockUpdateExample.mockResolvedValue(mockResult);

    const response = await request(server).put("/examples/1").send({
      name: "Updated Example",
      description: "Updated Description",
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(mockResult);
    expect(mockUpdateExample).toHaveBeenCalledWith("1", {
      name: "Updated Example",
      description: "Updated Description",
    });
  });

  it("should delete an example", async () => {
    mockDeleteExample.mockResolvedValue(undefined);

    const response = await request(server).delete("/examples/1");

    expect(response.status).toBe(httpStatus.NO_CONTENT);
    expect(mockDeleteExample).toHaveBeenCalledWith("1");
  });
});
