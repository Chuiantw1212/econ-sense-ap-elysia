import { cors } from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
/**
 * https://elysiajs.com/plugins/cors
 */

export default new Elysia()
    .use(cors({
        origin: 'http://localhost:5173',
    }))