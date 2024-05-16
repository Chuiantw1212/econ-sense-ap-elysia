import { Elysia } from 'elysia'

export default new Elysia()
    .get('/', (req: Request) => {
        console.log(req)
        return 'hi'
    })