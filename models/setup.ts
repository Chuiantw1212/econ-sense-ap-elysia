import { Elysia } from 'elysia'

// setup.ts
export default new Elysia({ name: 'setup' })
    .decorate('a', 'a')
    .get('/', ({ a }) => a)