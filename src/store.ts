import Vue from 'vue'
import Vuex from 'vuex'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

Vue.use(Vuex)

const store = new Vuex.Store({})
export default store

@Module({ store, dynamic: true,  name: 'test' })
class StoreModule extends VuexModule {
    public count = 0

    @Mutation
    public addCount(delta: number) {
        this.count += delta
    }

    @Action
    public increment() {
        this.addCount(1)
    }
}

export const appStore = getModule(StoreModule)
