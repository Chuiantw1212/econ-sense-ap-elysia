import { Elysia } from "elysia";
import rootController from './controllers/root'

const elysia: Elysia = new Elysia()
// const app = elysia.get("/", () => "Hello Elysia").listen(8000);
elysia.use(rootController)
elysia.listen(8080)

console.log(
  `🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`
);
