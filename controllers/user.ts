import { Elysia } from 'elysia'
import UserModel from '../models/user'
import firebase from '../plugins/firebase'
import { bearer } from '@elysiajs/bearer'
const userController = new Elysia({ prefix: '/user' })
    .use(bearer())
    .decorate('UserModel', UserModel)
    .put('/user/profile', async (req) => {
        try {
            const idToken = req.bearer || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeProfile(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/career', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeCareer(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/retirement', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeRetirement(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/estatePrice', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeEstatePrice(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/estateSize', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeEstateSize(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/estate', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeMortgage(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/spouse', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeSpouse(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/parenting', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeParenting(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .put('/user/security', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userPart = req.body as any
            await UserModel.mergeInvestment(user.uid, userPart)
            return
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .post('/user/new', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm = await UserModel.addNewUser(user.uid)
            const interestRate = await BankModel.getInterestRate()
            if (userForm.estate) {
                userForm.estate.interestRate = interestRate
            }
            return userForm
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    .get('/user/type', async (req) => {
        try {
            const userForm = await UserModel.getUserForm()
            return userForm
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })
    // 不確定如果改成get, cache後會不會造成不驗證直接回傳的狀況
    .post('/user/:uid', async (req) => {
        try {
            const idToken = req.headers.authorization || ''
            const user = await firebase.verifyIdToken(idToken)
            const userForm = await UserModel.getUser(user.uid)
            return userForm
        } catch (error: any) {
            req.set.status = 500
            return error.message || error
        }
    })

export default userController
