import { Elysia } from 'elysia'

/**
 * Seperate files
 * https://elysiajs.com/essential/plugin.html#separate-file
 */
export default new Elysia()
    .get('/', (req: Request) => {
        // Service.do1(name)
        // Service.do2(name)
        return 'hi'
    })

/**
 * const version = (version = 1) => new Elysia()
    .get('/version', version)
 */