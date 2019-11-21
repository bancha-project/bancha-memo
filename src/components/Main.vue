<template lang="pug">
    main
        .copy-area
            input#copy-area.hidden(type="text")
        .filter
            input#filter(type="text" placeholder="filter" :value="condition" @input="changeCondition")
        .group(v-for="itemGroup in itemGroups")
            GroupCard(:itemGroup="itemGroup")
        .add-icon.add-group
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
