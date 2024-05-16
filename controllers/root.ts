import { Elysia } from 'elysia'

const elysia = new Elysia()
elysia.get('/', (req: Request) => {
    return 'hi'
})

export default elysia