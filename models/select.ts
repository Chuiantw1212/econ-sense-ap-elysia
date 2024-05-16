import type { IOptionsItem, ISelectMap, ISelectDocData } from '../types/select'
import { Query, QuerySnapshot, CollectionReference, DocumentReference, DocumentData } from 'firebase-admin/firestore'

export class SelectModel {
    collection: CollectionReference
    options: ISelectMap = {}
    optionKeys: string[] = ['floorSizes', 'buildingAges', 'buildingTypes', 'genders', 'retirementQuartile', 'insuranceTypes']
    constructor(payload: any = {}) {
        const { firebase } = payload
        const firestore = firebase?.getFirestore()
        this.collection = firestore?.collection('selects')
    }
    initialize(payload: any) {
        const { firebase } = payload
        const firestore = firebase?.getFirestore()
        this.collection = firestore.collection('selects')
        this.setOptions()
    }
    async setOptions() {
        const promises = this.optionKeys.map(key => {
            return this.getOptionsByKey(key)
        })
        const options = await Promise.all(promises)
        this.optionKeys.forEach((key, index) => {
            this.options[key] = options[index]
        })
    }
    async getOptionsMap() {
        const promises = this.optionKeys.map(async (key: string) => {
            let options = this.options[key]
            if (!options?.length) {
                options = await this.getOptionsByKey(key)
            }
            const selectDocData: ISelectDocData = {
                key: key,
                options
            }
            return selectDocData
        })
        const docDatas: ISelectDocData[] = await Promise.all(promises)
        const selectMap: ISelectMap = {}
        docDatas.forEach(docData => {
            selectMap[docData.key] = docData.options
        })
        return selectMap
    }
    async getOptionsByKey(key: string,): Promise<IOptionsItem[]> {
        console.log({ key })
        const keyQuery = this.collection.where('key', '==', key).limit(1)
        // console.log(key, (await this.collection.get()).docs[0].data())
        const data = (await this.collection.get()).docs[0].data()
        console.log(data)
        const snapshot = await this.collection.where('key', '==', key).get()
        console.log('??')
        return []
        if (snapshot.docs.length) {
            const options: IOptionsItem[] = snapshot.docs[0].data().options
            return options
        }
    }
    async replaceByKey(key: string, options: IOptionsItem[] = []) {
        const keyQuery: Query = this.collection.where('key', '==', key)
        const countData: DocumentData = await keyQuery.count().get()
        const count: number = countData.data().count
        switch (count) {
            case 0: {
                this.collection.add({
                    key,
                    options
                })
                break;
            }
            case 1: {
                const snapshot: QuerySnapshot = await keyQuery.get()
                snapshot.forEach(data => {
                    const dataReference: DocumentReference = data.ref
                    dataReference.set({
                        options,
                    }, { merge: true });
                })
                break;
            }
            default: {
                throw '資料有誤'
            }
        }
    }
}
const selectModel = new SelectModel()
export default selectModel