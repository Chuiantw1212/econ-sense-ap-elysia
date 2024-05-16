import { Elysia, } from 'elysia'
import { cors } from '@elysiajs/cors'
export default new Elysia().use(cors({
    origin: 'http://localhost:5173'
}))