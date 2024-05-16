import { Elysia } from 'elysia'
import UserModel from '../models/user'
const users = new Elysia({ prefix: '/user' })
    .decorate('UserModel', UserModel)
    .get('/', (req) => {
        // req.UserModel.test()
        return 'test'
    })
    .post('/sign-in', (req: Request) => {
        return 'Sign in'
    })
    .post('/sign-up', (req: Request) => {
        return 'Sign up'
    })
    .post('/profile', (req: Request) => {
        return 'Profile'
    })

export default users
