import { Elysia, t } from 'elysia'
import { env } from '@yolk-oss/elysia-env'

const plugin = new Elysia()
    .use(
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
export default plugin