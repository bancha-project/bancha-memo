<template lang="pug">
    .group-card
        .title
            template(v-if="isTitleEditMode")
                input.input(
                    type="text"
                    @blur="editTitleDone"
                    @keydown.enter="blur"
                    :value="this.itemGroup.name"
                    v-focus
                )
            template(v-else)
                p.title(@click="isTitleEditMode = true")
                     u(v-html="title")
        .item(v-for="item in itemGroup.items")
            ItemField(:groupName="itemGroup.name" :item="item")
        .delete-icon.delete-group
            font-awesome-icon(icon="times-circle" @click="deleteItem")
        .add-icon.add-item
            font-awesome-icon(icon="plus-circle" @click="addItem")
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ItemField from '@/components/ItemField.vue'
    import ItemGroup from '@/domain/ItemGroup'
    import { appStore } from '@/store'
    import DomUtils from '@/utils/DomUtils'

    @Component({
        components: {
            ItemField,
        },
    })
    export default class GroupCard extends Vue {

        @Prop() private readonly itemGroup!: ItemGroup

        private isTitleEditMode = false

        private isDeleteMode = false

        get title() {
            if (appStore.condition === '') {
                return this.itemGroup.name
            }
            return DomUtils.hilightSelectedWord(this.itemGroup.name, appStore.condition)
        }

        private editTitleDone(e: any) {
            this.isTitleEditMode = false
            appStore.setItemGroupName({
                prev: this.itemGroup.name,
                after: e.target.value,
            })
            appStore.save()
        }

        private blur(el: any) {
            el.target.blur()
        }

        private addItem() {
            appStore.addItem({ itemGroupName: this.itemGroup.name })
            appStore.save()
        }

        private deleteItem() {
            appStore.deleteItemGroup({ itemGroupName: this.itemGroup.name })
            appStore.save()
        }
    }
</script>

<style>
    .group-card {
        padding: 10px;
        border-bottom: 1px solid grey;
        position: relative;
    }

    .add-item {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

    .delete-group {
        color: #ff777e;
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>
