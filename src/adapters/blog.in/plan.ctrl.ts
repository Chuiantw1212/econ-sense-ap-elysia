import { IPlan } from '../../entities/plan';
import AccessGlobalService, { ILocals, extractLocals } from '../../entities/app'
import { Elysia, } from 'elysia'
const router = new Elysia
/**
 * 這邊示範Middleware用法
 * https://github.com/kartikk221/hyper-express/blob/master/docs/Middlewares.md
 */
router.onBeforeHandle(async ({ request }) => {
    try {
        const { VerifyIdTokenService } = AccessGlobalService.locals
        const headers = request.headers
        const authorization = headers.get('authorization')
        const user = await VerifyIdTokenService.verifyIdToken(authorization)

        /**
         * request.locals。非Node.js/HyperExpress/Express官方的用法，而是撰寫Node.js約定俗成的做法。
         * https://stackoverflow.com/questions/33451053/request-locals-vs-res-locals-vs-res-data-vs-request-data-vs-app-locals-in-express-mi
         */
        Object.assign(request, {
            locals: { user }
        })
    } catch (error: any) {
        return error.message || error
    }
});

router.put('/plan/profile', async function ({ request }) {
    try {
        const { PutProfileService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutProfileService.mergeProfile(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/career', async function ({ request }) {
    try {
        const { PutCareerService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutCareerService.mergeCareer(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/retirement', async function ({ request }) {
    try {
        const { PutRetirementService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutRetirementService.mergeRetirement(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/estatePrice', async function ({ request }) {
    try {
        const { PutEstatePriceService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutEstatePriceService.mergeEstatePrice(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/estateSize', async function ({ request }) {
    try {
        const { PutEstateSizeService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutEstateSizeService.mergeEstateSize(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/estate', async function ({ request }) {
    try {
        const { PutMortgageService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutMortgageService.mergeMortgage(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/spouse', async function ({ request }) {
    try {
        const { PutSpouseService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutSpouseService.mergeSpouse(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/parenting', async function ({ request }) {
    try {
        const { PutParentingService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutParentingService.mergeParenting(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.put('/plan/security', async function ({ request }) {
    try {
        const { PutSecurityService } = AccessGlobalService.locals
        const userPart = await request.json()
        const locals = extractLocals(request)
        await PutSecurityService.mergeSecurity(locals.user.uid, userPart)
    } catch (error: any) {
        return error.message || error
    }
})

router.post('/plan/new', async function ({ request }) {
    try {
        const { GetPlanEntityService, PostNewPlanService, GetBackedInterestRateService } = AccessGlobalService.locals
        const planEntity = GetPlanEntityService.getPlanEntity()
        const locals = extractLocals(request)
        const planForm: IPlan = await PostNewPlanService.addNewPlan(locals.user.uid, planEntity)
        const interestRate = await GetBackedInterestRateService.getBackedInterestRate()
        if (planForm.estate) {
            planForm.estate.interestRate = interestRate
        }
        return planForm
    } catch (error: any) {
        return error.message || error
    }
})

router.get('/plan', async function ({ request }) {
    try {
        const { GetUserPlanService } = AccessGlobalService.locals
        const locals = extractLocals(request)
        const planForm = await GetUserPlanService.getPlan(locals.user.uid)
        return planForm
    } catch (error: any) {
        return error.message || error
    }
})
export default router