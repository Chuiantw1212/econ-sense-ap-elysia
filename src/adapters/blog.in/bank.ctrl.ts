import AccessGlobalService from '../../entities/app'
import { Elysia, } from 'elysia'
const router = new Elysia
router.get('/finance/interestRate', async function () {
    try {
        const { GetBackedInterestRateService } = AccessGlobalService.locals
        const interestRate: number = await GetBackedInterestRateService.getBackedInterestRate()
        return interestRate
    } catch (error: any) {
        console.trace(error.message || error)
        return error.message || error
    }
})
router.get('/finance/portfolioIrr', async function () {
    try {
        const { GetPortfolioIRRService } = AccessGlobalService.locals
        const portfolioIRR = await GetPortfolioIRRService.getPortfolioIRR()
        return portfolioIRR
    } catch (error: any) {
        console.trace(error.message || error)
        return error.message || error
    }
})
// Deprecated
router.get('/bank/config/interestRate', async function () {
    try {
        const { GetBackedInterestRateService } = AccessGlobalService.locals
        const interestRate: number = await GetBackedInterestRateService.getBackedInterestRate()
        return interestRate
    } catch (error: any) {
        console.trace(error.message || error)
        return error.message || error
    }
})
// Deprecated
router.get('/bank/config/portfolioIrr', async function () {
    try {
        const { GetPortfolioIRRService } = AccessGlobalService.locals
        const portfolioIRR = await GetPortfolioIRRService.getPortfolioIRR()
        return portfolioIRR
    } catch (error: any) {
        console.trace(error.message || error)
        return error.message || error
    }
})

export default router