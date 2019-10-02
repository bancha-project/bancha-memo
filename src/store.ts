import Vue from 'vue'
import Vuex from 'vuex'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import fs from 'fs'
import jsYaml from 'js-yaml'

Vue.use(Vuex)

const store = new Vuex.Store({})
export default store

@Module({ store, dynamic: true,  name: 'storeModule' })
class StoreModule extends VuexModule {

    public yaml = {}

    @Mutation
    public setYaml(yaml: any) {
        this.yaml = yaml
    }

    @Action
    public loadYamlFromFile() {
        const dialog = require('electron').remote.dialog
        const filepaths = dialog.showOpenDialogSync({
            properties: ['openFile'],
            title: 'Select a text file',
            defaultPath: '.',

        })
        const txt = fs.readFileSync(filepaths![0], 'utf8')
        this.setYaml(jsYaml.safeLoad(txt))
    }

    @Action
    public copy(s: string) {
        const copyArea = document.getElementById('copy-area')! as HTMLInputElement
        copyArea.value = s
        copyArea.select()
        document.execCommand('copy')
    }
}

export const appStore = getModule(StoreModule)
