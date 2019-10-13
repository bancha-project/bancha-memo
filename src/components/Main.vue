<template lang="pug">
    main.container.pt-20
        input#copy-area.hidden(type="text")
        .field
            .control.has-icons-left
                input.input.is-info(type="text" placeholder="しぼりこみ" :value="condition" @input="changeCondition")
                span.icon.is-small.is-left
                    font-awesome-icon.hover-grey(icon="filter" size="lg")
        div.mb-20(v-for="itemGroup in itemGroups")
            GroupCard(:itemGroup="itemGroup")
        div.add-group
            font-awesome-icon(icon="plus-circle" size="2x" @click="addItemGroup")
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'
    import GroupCard from '@/components/GroupCard.vue'

    @Component({
        components: {
            GroupCard,
        },
    })
    export default class Main extends Vue {

        get itemGroups() {
            return appStore.filteredItemGroups
        }

        get condition() {
            return appStore.condition
        }

        private changeCondition(e: any) {
            appStore.setCondition(e.target.value)
        }

        private addItemGroup() {
            appStore.addItemGroup()
            appStore.save()
            scrollTo(0, window.parent.screen.height)
        }
    }
</script>

<style>
    .hidden {
        position: absolute;
        top: -200px;
    }

    .add-group {
        color: green;
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
</style>
