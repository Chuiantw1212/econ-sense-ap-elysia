import { Elysia } from "elysia";
import envPlugin from './plugins/env'
import corsPlugin from './plugins/cors'
import setupModel from './models/setup'
import rootController from './controllers/root'
function version(version = 1) {
  return new Elysia()
  .get('/version', version)
}

/**
 * Seperate files
 * https://elysiajs.com/essential/plugin.html#separate-file
 */
const elysia = new Elysia()
  .use(envPlugin)
  // plugin
  .use(corsPlugin)
  .use(version(1))
  .use(setupModel)
  // controllers
  .use(rootController)
  .listen(8080)

console.log(
  `🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`
);
