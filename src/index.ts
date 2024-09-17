const time = new Date().getTime()
// Elysia cores
import { Elysia } from "elysia";
import { node } from '@elysiajs/node'
import { cors } from '@elysiajs/cors'
import path from 'path'
// entities
import AccessGlobalService from './entities/app'
// adapters
import firebase from './adapters/firebase.out'
import googleCloud from './adapters/googleCloud.out'
import chatGpt from './adapters/chatGpt.out'
import centralBank from './adapters/centralBank.out'
import ishares from './adapters/ishares.out'
// models
import SelectModel from './domain/Select.model'
import LifeExpectancyModel from './domain/LifeExpectancy.model';
import EstateContractModel from './domain/EstateContract.model'
import LocationModel from './domain/Location.model';
import PlanModel from './domain/Plan.model';
// services.others
import { ILocals } from './entities/app';
import GetNewStoryService from './domain/chat.service/GetNewStory';
import GetTranslationService from './domain/chat.service/GetTranslation';
import GetBackedInterestRateService from './domain/finance.service/GetBackedInterestRate';
import GetTaiwanLocationService from './domain/meta.service/GetTaiwanLocations';
import GetPortfolioIRRService from './domain/finance.service/GetPortfolioIRR';
import GetOptionsService from './domain/meta.service/GetOptions';
import GetLifeExpectancyService from './domain/finance.service/GetLifeExpectancy';
import GetEstateUnitPriceService from './domain/finance.service/GetEstateUnitPrice';
import VerifyIdTokenService from './domain/auth.service';
// services.plan
import PutEstatePriceService from './domain/plan.service/PutPlanEstatePrice';
import GetPlanEntityService from './domain/plan.service/GetPlanEntity';
import PutCareerService from './domain/plan.service/PutPlanCareer';
import PutEstateSizeService from './domain/plan.service/PutPlanEstateSize';
import PutMortgageService from './domain/plan.service/PutPlanMortagage';
import PutParentingService from './domain/plan.service/PutPlanParenting';
import PutProfileService from './domain/plan.service/PutPlanProfile';
import PutRetirementService from './domain/plan.service/PutPlanRetirement';
import PutSecurityService from './domain/plan.service/PutPlanSecurity';
import PutSpouseService from './domain/plan.service/PutPlanSpouse';
import PostNewPlanService from './domain/plan.service/PostNewPlan';
import GetUserPlanService from './domain/plan.service/GetUserPlan';
// controllers
import rootController from './adapters/blog.in/root.ctrl'
import bankController from './adapters/blog.in/bank.ctrl'
import calculateController from './adapters/blog.in/calculate.ctrl'
import chatController from './adapters/blog.in/chat.ctrl'
import planController from './adapters/blog.in/plan.ctrl'
import metaController from './adapters/blog.in/meta.ctrl'

(async () => {
    const app = new Elysia()
    /**
     * Adapters
     */
    let OPENAI_API_KEY: string = ''
    try {
        OPENAI_API_KEY = await googleCloud.accessSecret('OPENAI_API_KEY')
    } catch (error: any) {
        console.trace(error.message)
        const keyPath = path.resolve(__dirname, '../OPEN_API_KEY.json')
        OPENAI_API_KEY = require(keyPath);
    }
    chatGpt.initializeSync(OPENAI_API_KEY)
    // Load firebase
    let FIREBASE_SERVICE_ACCOUNT_KEY_JSON = null
    try {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessSecret('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    } catch (error: any) {
        console.trace(error.message)
        const keyPath = path.resolve(__dirname, '../FIREBASE_SERVICE_ACCOUNT_KEY_JSON.json')
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = require(keyPath);
    }
    const firestore = await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    /**
     * models
     */
    const selectModel = new SelectModel(firestore)
    const lifeExpectancyModel = new LifeExpectancyModel(firestore)
    const estateContractModel = new EstateContractModel(firestore)
    const locationModel = new LocationModel(firestore)
    const planModel = new PlanModel(firestore)

    /**
     * Services
     */
    const allServices: ILocals = {
        GetNewStoryService: new GetNewStoryService(chatGpt),
        GetTranslationService: new GetTranslationService(chatGpt),
        GetBackedInterestRateService: new GetBackedInterestRateService({
            adapter: centralBank,
            model: selectModel,
        }),
        GetPortfolioIRRService: new GetPortfolioIRRService({
            adapter: ishares,
            model: selectModel,
        }),
        GetOptionsService: new GetOptionsService({
            model: selectModel
        }),
        GetLifeExpectancyService: new GetLifeExpectancyService({
            model: lifeExpectancyModel,
        }),
        GetEstateUnitPriceService: new GetEstateUnitPriceService({
            estateContractsModel: estateContractModel,
            locationModel: locationModel
        }),
        GetTaiwanLocationService: new GetTaiwanLocationService({
            model: locationModel
        }),
        // Plan
        GetPlanEntityService: new GetPlanEntityService(),
        PostNewPlanService: new PostNewPlanService(planModel),
        GetUserPlanService: new GetUserPlanService(planModel),
        PutCareerService: new PutCareerService(planModel),
        PutEstateSizeService: new PutEstateSizeService(planModel),
        PutMortgageService: new PutMortgageService(planModel),
        PutParentingService: new PutParentingService(planModel),
        PutProfileService: new PutProfileService(planModel),
        PutRetirementService: new PutRetirementService(planModel),
        PutSecurityService: new PutSecurityService(planModel),
        PutSpouseService: new PutSpouseService(planModel),
        PutEstatePriceService: new PutEstatePriceService(planModel),
        VerifyIdTokenService: new VerifyIdTokenService(firebase)
    }
    Object.assign(AccessGlobalService.locals, {
        ...allServices
    })

    /**
       * controllers
       */
    app.use(rootController)
    app.use(bankController)
    app.use(calculateController)
    app.use(chatController)
    app.use(planController)
    app.use(metaController)

    /**
     * middlewares
     */
    app.use(cors({
        origin: ['https://econ-sense.com/', 'http://localhost:5173'],
    }))

    /**
     * App Start
     */
    const port = 3000
    app.listen(port)
    // app.use(node(port))
    console.log(
        `🦊 Elysia is running at http://localhost:${port}`
    );
    const timeEnd = new Date().getTime()
    const timeDiff = (timeEnd - time) / 1000
    AccessGlobalService.set('startupTime', timeDiff)
})()
