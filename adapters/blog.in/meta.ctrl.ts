import AccessGlobalService from '../../entities/app'
import { Elysia, } from 'elysia'
const router = new Elysia
router.get('/meta/plan', async function () {
    try {
        const { GetPlanEntityService } = AccessGlobalService.locals
        const planForm = await GetPlanEntityService.getPlanEntity()
        return planForm
    } catch (error: any) {
        return error.message || error
    }
})
router.get('/meta/select', async function () {
    try {
        const { GetTaiwanLocationService, GetOptionsService } = AccessGlobalService.locals
        const countiesAndTownMap = await GetTaiwanLocationService.getTaiwanLocations()
        const selectOptionsMap = await GetOptionsService.getOptionsMap()
        const result = {
            ...countiesAndTownMap,
            ...selectOptionsMap,
        }
        return result
    } catch (error: any) {
        return error.message || error
    }
})
export default router