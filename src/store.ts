import Vue from 'vue'
import Vuex from 'vuex'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import fs from 'fs'
import jsYaml from 'js-yaml'
import ElectronStore from 'electron-store'
import ItemGroup from '@/domain/ItemGroup'
import Item from '@/domain/Item'

Vue.use(Vuex)

const store = new Vuex.Store({})
export default store

@Module({ store, dynamic: true,  name: 'storeModule' })
class StoreModule extends VuexModule {

    public itemGroups: ItemGroup[] = []

    private electronStore = new ElectronStore()
    private FILEPATH_KEY = 'filepath'

    @Mutation
    public setItemGroups(itemGroups: ItemGroup[]) {
        this.itemGroups = itemGroups
    }

    /**
     * - ファイル選択ダイアログを開き、yamlを選択させる
     * - パスはローカルストレージに保存しておく
     * - TODO パスがあるのに上手くファイルが開けない場合はエラーにする
     * - TODO このアプリ用にパースできない場合はエラーにする
     */
    @Action
    public loadYamlFromFile(filepath: string) {
        const txt = fs.readFileSync(filepath, 'utf8')
        const yaml = jsYaml.safeLoad(txt)
        const itemGroups: ItemGroup[] = []
        for (const groupKey of Object.keys(yaml)) {
            const groupValue = yaml[groupKey]
            const itemGroup: ItemGroup = { name: groupKey, items: [] }
            for (const itemKey of Object.keys(groupValue)) {
                const itemValue = groupValue[itemKey]
                const item: Item = { key: itemKey, value: itemValue }
                itemGroup.items.push(item)
            }
            itemGroups.push(itemGroup)
        }

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
}

export const appStore = getModule(StoreModule)
