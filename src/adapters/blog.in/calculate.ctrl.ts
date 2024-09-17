import AccessGlobalService from '../../entities/app'
import { Elysia, } from 'elysia'
const router = new Elysia
router.post('/finance/lifeExpectancy', async function ({ request }) {
    try {
        const { GetLifeExpectancyService } = AccessGlobalService.locals
        const body = await request.json()
        const lifeExpectancy = await GetLifeExpectancyService.getLifeExpectancy(body)
        return lifeExpectancy
    } catch (error: any) {
        return error.message || error
    }
})
router.post('/finance/unitPrice', async function ({ request }) {
    try {
        const { GetEstateUnitPriceService } = AccessGlobalService.locals
        const body = await request.json()
        const result = await GetEstateUnitPriceService.getEstateUnitPrice(body)
        return result
    } catch (error: any) {
        return error.message || error
    }
})
// deprecated
router.post('/calculate/lifeExpectancy', async function ({ request }) {
    try {
        const { GetLifeExpectancyService } = AccessGlobalService.locals
        const body = await request.json()
        const lifeExpectancy = await GetLifeExpectancyService.getLifeExpectancy(body)
        return lifeExpectancy
    } catch (error: any) {
        return error.message || error
    }
})
// deprecated
router.post('/calculate/unitPrice', async function ({ request }) {
    try {
        const { GetEstateUnitPriceService } = AccessGlobalService.locals
        const body = await request.json()
        const result = await GetEstateUnitPriceService.getEstateUnitPrice(body)
        return result
    } catch (error: any) {
        return error.message || error
    }
})
export default router