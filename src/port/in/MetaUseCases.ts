import PlanEntity from '../../entities/plan'
import type { ISelectMap, IOptionsItem } from '../../entities/select'

export interface GetPlanInterfaceUseCase {
    getPlanEntity: () => PlanEntity
}

export interface GetOptionsUseCase {
    getOptionsMap: () => Promise<ISelectMap>
}

export interface GetTaiwanLocation {
    getTaiwanLocations: () => Promise<{
        counties: IOptionsItem[],
        townMap: ISelectMap,
    }>
}