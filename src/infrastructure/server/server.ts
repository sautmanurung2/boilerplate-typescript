import express, { type Application } from "express";
import { serverConfig } from "../config/config";
import { AppDataSource } from "../database/database";
import exampleRoutes from "./routes/ExampleRoutes";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running, authors: Saut Manurung");
});

app.use("/examples", exampleRoutes);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
    const server = app.listen(serverConfig.port, serverConfig.host, () => {
      console.log(`Server is running on ${serverConfig.host}:${serverConfig.port}`);
    });
    return server;
  } catch (error) {
    console.error("Database connection failed: ", error);
    throw error;
  }
};

const stopServer = async (server: any) => {
  await new Promise<void>((resolve) => {
    server.close(() => {
      console.log("Server stopped.");
      resolve();
    });
  });
};

export { app, startServer, stopServer };
