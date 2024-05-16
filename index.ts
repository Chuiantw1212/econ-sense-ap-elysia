import { Elysia } from "elysia"
// plugins core
import envPlugin from './plugins/env'
import corsPlugin from './plugins/cors'
import firebase from './plugins/firebase'
// plugins
import { serverTiming } from '@elysiajs/server-timing'
// models
import setupModel from './models/setup'
import userModel from './models/user'
// controllers
import rootController from './controllers/root'
import userController from './controllers/user'
(async () => {
  console.time('test')
  await firebase.initialize()
  await userModel.initialize({
    firebase,
  })
  /**
   * Seperate files
   * https://elysiajs.com/essential/plugin.html#separate-file
  */
  const elysia = new Elysia()
    .use(envPlugin)
    // plugin
    .use(corsPlugin)
    .use(serverTiming())
    // models
    .use(setupModel)
    // controllers
    .use(rootController)
    .use(userController)
    .listen(8080)

  console.log(
    `🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`
  );
  console.timeEnd('test')
})()
