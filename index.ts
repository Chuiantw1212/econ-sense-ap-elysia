import { Elysia } from "elysia";

/**
 * Seperate files
 * https://elysiajs.com/essential/plugin.html#separate-file
 */
const elysia: Elysia = new Elysia()
// plugin core
import envPlugin from './plugins/env'
elysia.use(envPlugin)
// plugin
import corsPlugin from './plugins/cors'
elysia.use(corsPlugin)

// controllers
import rootController from './controllers/root'
elysia.use(rootController)
elysia.listen(8080)

console.log(
  `🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`
);
