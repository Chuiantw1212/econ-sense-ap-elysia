import { Elysia, } from 'elysia'
import { cors } from '@elysiajs/cors'
import type { extendsApp } from '../types/app'
const plugin = new Elysia()

plugin.use(cors({
    origin: /.*\.saltyaom\.com$/
}))

plugin.macro(({ onBeforeHandle }) => ({
    checkOrigin() {
        onBeforeHandle((elysia) => {
            // elysia.request
            console.log(elysia.env)
        })
    }
})).get('*', (req: Request) => 'hi', {
    checkOrigin: true
})

export default plugin