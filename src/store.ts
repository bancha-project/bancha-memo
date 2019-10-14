import Vue from 'vue'
import Vuex from 'vuex'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import ElectronStore from 'electron-store'
import ItemGroup from '@/domain/ItemGroup'
import Item from '@/domain/Item'
import FileUtils from '@/utils/FileUtils'
import ItemFactory from '@/domain/ItemFactory'
import ItemGroupFactory from '@/domain/ItemGroupFactory'

Vue.use(Vuex)

const store = new Vuex.Store({})
export default store

function findItemGroupByName(name: string, itemGroups: ItemGroup[]): ItemGroup | undefined {
    return itemGroups.find((itemGroup) => itemGroup.name === name)
}

function findItemByKey(key: string, items: Item[]): Item | undefined {
    return items.find((item) => item.key === key)
}

@Module({ store, dynamic: true,  name: 'storeModule' })
class StoreModule extends VuexModule {

    public itemGroups: ItemGroup[] = []
    public condition: string = ''

    private electronStore = new ElectronStore()
    private FILEPATH_KEY = 'filepath'

    @Mutation
    public setItemGroups(itemGroups: ItemGroup[]) {
        this.itemGroups = itemGroups
    }

    @Mutation
    public setCondition(condition: string) {
        this.condition = condition
    }

    @Action
    public newFile(filepath: string) {
        this.electronStore.set(this.FILEPATH_KEY, filepath)
        this.setItemGroups([])
        this.setCondition('')
    }

    /**
     * - ファイル選択ダイアログを開き、yamlを選択させる
     * - パスはローカルストレージに保存しておく
     * - TODO パスがあるのに上手くファイルが開けない場合はエラーにする
     * - TODO このアプリ用にパースできない場合はエラーにする
     */
    @Action
    public loadYamlFromFile(filepath: string) {
        const yaml = FileUtils.loadYaml(filepath)
        const itemGroups = ItemGroupFactory.fromYaml(yaml)
        this.setItemGroups(itemGroups)
        this.electronStore.set(this.FILEPATH_KEY, filepath)
    }

    /**
     * - アイコンがクリックされた値をコピーする
     * @param s
     */
    @Action
    public copy(s: string) {
        const copyArea = document.getElementById('copy-area')! as HTMLInputElement
        copyArea.value = s
        copyArea.select()
        document.execCommand('copy')
    }

    /**
     * - ローカルストレージにyamlのパスが保存してある場合、それをロードする
     */
    @Action
    public init() {
        const filepath = this.electronStore.get(this.FILEPATH_KEY)
        if (filepath) {
            this.loadYamlFromFile(filepath)
        }
    }

    get filteredItemGroups(): ItemGroup[] {
        return this.itemGroups.map( (itemGroup) => {
            if (itemGroup.name.includes(this.condition)) {
                return itemGroup
            }
            return {
                name: itemGroup.name,
                items: itemGroup.items.filter((item) => {
                    return (item.key).includes(this.condition)
                }),
            }
        }).filter( (itemGroup) => {
            return itemGroup.items.length > 0
        })
    }

    @Mutation
    public setItemGroupName(param: {prev: string, after: string}) {
        const targetItemGroup = findItemGroupByName(param.prev, this.itemGroups)
        if (targetItemGroup) {
            targetItemGroup.name = param.after
        }
    }

    @Mutation
    public setItemKey(param: {itemGroupName: string, prev: string, after: string}) {
        const targetItemGroup = findItemGroupByName(param.itemGroupName, this.itemGroups)
        if (targetItemGroup) {
            const targetItem = findItemByKey(param.prev, targetItemGroup.items)
            if (targetItem) {
                targetItem.key = param.after
            }
        }
    }

    @Mutation
    public setItemValue(param: {itemGroupName: string, itemKey: string, prev: string, after: string}) {
        const targetItemGroup = findItemGroupByName(param.itemGroupName, this.itemGroups)
        if (targetItemGroup) {
            const targetItem = findItemByKey(param.prev, targetItemGroup.items)
            if (targetItem) {
                targetItem.value = param.after
            }
        }
    }

    @Mutation
    public addItem(param: {itemGroupName: string}) {
        const targetItemGroup = findItemGroupByName(param.itemGroupName, this.itemGroups)
        if (targetItemGroup) {
            targetItemGroup.items.push(ItemFactory.createNew())
        }
    }

    @Mutation
    public addItemGroup() {
        this.itemGroups.push(ItemGroupFactory.createNew())
    }

    @Mutation
    public deleteItem(param: { itemGroupName: string, itemKey: string}) {
        const targetItemGroup = findItemGroupByName(param.itemGroupName, this.itemGroups)
        if (targetItemGroup) {
            const idx = targetItemGroup.items.findIndex((item) => item.key === param.itemKey)
            targetItemGroup.items.splice(idx, 1)
        }
    }

    @Mutation
    public deleteItemGroup(param: { itemGroupName: string }) {
        const idx = this.itemGroups.findIndex((itemGroup) => itemGroup.name === param.itemGroupName)
        this.itemGroups.splice(idx, 1)
    }

    @Action
    public save() {
        const filepath = this.electronStore.get(this.FILEPATH_KEY)

        const itemGroupObject: any = {}
        for (const itemGroup of this.itemGroups) {
            const itemObject: any = {}
            for (const item of itemGroup.items) {
                itemObject[item.key] = item.value
            }
            itemGroupObject[itemGroup.name] = itemObject
        }
        FileUtils.saveYaml(filepath, itemGroupObject)
    }
}

export const appStore = getModule(StoreModule)
