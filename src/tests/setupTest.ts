import { startServer, stopServer } from "../infrastructure/server/server";

let server: any;

beforeAll(async () => {
  // Start the server before all tests run
  console.log("Starting server before tests...");
  server = await startServer();
});

afterAll(async () => {
  // Stop the server after all tests are done
  console.log("Stopping server after tests...");
  if (server) {
    await stopServer(server); // Ensure stopServer is properly awaited
  }
});

beforeEach(() => {
  // Setup code to run before each test (if needed)
  console.log("Running setup before each test...");
});

afterEach(() => {
  // Cleanup code to run after each test (if needed)
  console.log("Cleaning up after each test...");
});
