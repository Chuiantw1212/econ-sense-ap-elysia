import { Elysia } from 'elysia'
import UserModel from '../models/user'
const users = new Elysia({ prefix: '/user' })
    .decorate('userModel', new UserModel(new Elysia()))
    .get('/', (req) => {
        req.userModel.test()
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
