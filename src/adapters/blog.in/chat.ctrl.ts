import AccessGlobalService from '../../entities/app'
import { Elysia, } from 'elysia'
const router = new Elysia
router.post('/chat/story', async function ({ request }) {
    try {
        const { GetNewStoryService } = AccessGlobalService.locals
        const input = await request.json()
        const output = await GetNewStoryService.makeStory(input)
        return output
    } catch (error: any) {
        return error.message || error
    }
})
router.post('/chat/translate', async function ({ request }) {
    try {
        const { GetTranslationService } = AccessGlobalService.locals
        const input = await request.json()
        const output = await GetTranslationService.translate(input)
        return output
    } catch (error: any) {
        return error.message || error
    }
})
export default router