<template lang="pug">
    main.container.pt-20
        input#copy-area.hidden(type="text")
        .box.mb-10(v-for="itemGroup in itemGroups")
            p.title.is-4 {{ itemGroup.name }}
            .field(v-for="item in itemGroup.items")
                label.label.ml-10.mt-20 {{ item.key }}
                .control
                    .is-inline-block
                        font-awesome-icon.hover-grey(icon="copy" @click="() => { copy(item.value) }" size="lg")
                    .is-inline-block.ml-10
                        input.input(type="text" :value="item.value" readonly)
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'

    @Component
    export default class Main extends Vue {

        get itemGroups() {
            return appStore.itemGroups
        }

        private copy(s: string) {
            appStore.copy(s)
        }
    }
</script>

<style>
    .hidden {
        position: absolute;
        top: -200px;
    }
</style>
