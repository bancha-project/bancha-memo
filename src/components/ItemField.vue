<template lang="pug">
    .item-field
        .copy-icon.inline-block
            font-awesome-icon(icon="copy" @click="() => { copy(item.value) }" :id="id")
        .key.inline-block.ml-10
            template(v-if="isKeyEditMode")
                input.input(
                    type="text"
                    @blur="editKeyDone"
                    @keydown.enter="blur"
                    :value="this.item.key"
                    v-focus
                )
            template(v-else)
                span(v-html="key" @click="isKeyEditMode = true")
        .value.inline-block.ml-10
            input.input(
                type="text"
                :value="item.value"
                @blur="editValueDone"
                @focus="select"
                @keydown.enter="blur"
                style="width: 400px;"
            )
        .delete-icon.inline-block.ml-10
            font-awesome-icon.delete-icon(icon="times-circle" @click="deleteItem")
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { appStore } from '@/store'
    import anime from 'animejs'
    import Item from '@/domain/Item'
    import DomUtils from '@/utils/DomUtils'
    import { hurricane } from '@/utils/AnimeUtils'
    import { calcMdDigest } from '@/utils/HashUtils'

    @Component
    export default class ItemField extends Vue {

        @Prop() private readonly groupName!: string

        @Prop() private readonly item!: Item

        private isKeyEditMode = false

        private copy(s: string) {
            anime({ targets: `#${this.id}`, ...hurricane })
            appStore.copy(s)
        }

        get id(): string {
            const digest = calcMdDigest(this.groupName + this.item.key)
            return 'copy-icon-' + digest.substring(0, 8)
        }

        get key() {
            if (appStore.condition === '') {
                return this.item.key
            }
            return DomUtils.hilightSelectedWord(this.item.key, appStore.condition)
        }

        private editKeyDone(e: any) {
            this.isKeyEditMode = false
            appStore.setItemKey({
                itemGroupName: this.groupName,
                prev: this.item.key,
                after: e.target.value,
            })
            appStore.save()
        }

        private select(el: any) {
            el.target.select()
        }

        private editValueDone(e: any) {
            appStore.setItemValue({
                itemGroupName: this.groupName,
                itemKey: this.item.key,
                prev: this.item.value,
                after: e.target.value,
            })
            appStore.save()
        }

        private blur(el: any) {
            el.target.blur()
        }

        private deleteItem() {
            if (window.confirm('本当に削除したい？')) {
                appStore.deleteItem({itemGroupName: this.groupName, itemKey: this.item.key})
                appStore.save()
            }
        }
    }
</script>

<style>
    .item-field {
        /*border: 1px solid blue;*/
    }

    .delete-icon {
        color: #ff777e;
    }
</style>
