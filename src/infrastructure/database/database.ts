import { DataSource } from "typeorm";
import { dbConfig } from "../config/config";
import { ExampleDatabaseEntity } from "./entities/ExampleDatabaseEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: false,
  entities: [ExampleDatabaseEntity],
});
