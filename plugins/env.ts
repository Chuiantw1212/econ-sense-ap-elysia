import { Elysia, t } from 'elysia'
import { env } from '@yolk-oss/elysia-env'

const app = new Elysia()
// console.log(app)
app.use(
    env({
        MODE: t.String({
            default: 'development',
            error: 'MODE is required for a service!',
        }),
        ORIGIN: t.String({
            default: 'http://localhost:5173',
            error: 'ORIGIN is required for a service!',
        }),
    }),
)
export default app