<template lang="pug">
    .field
        div
            template(v-if="isKeyEditMode")
                input.input(
                    type="text"
                    @blur="editKeyDone"
                    @keydown.enter="blur"
                    :value="this.item.key"
                    v-focus
                    style="height: 26px; margin: 10px 0;"
                )
            template(v-else)
                label.key(v-html="key" @click="isKeyEditMode = true")
        .control
            .is-inline-block
                font-awesome-icon(icon="copy" @click="() => { copy(item.value) }" size="lg" :id="id")
            .is-inline-block.ml-10(style="width:80%")
                input.input(
                    type="text"
                    :value="item.value"
                    @blur="editValueDone"
                    @focus="select"
                    @keydown.enter="blur"
                    style="height: 26px;"
                )
            .is-inline-block.ml-10
                font-awesome-icon.delete-icon(icon="times-circle" @click="isDeleteMode = true")
            .is-inline-block.ml-10(v-if="isLink")
                a(:href='item.value' target="_blank")
                    font-awesome-icon(icon="external-link-alt")
        .modal#delete-modal(:class="{ 'is-active': isDeleteMode}")
            .modal-background(@click="isDeleteMode = false")
            .modal-card
                header.modal-card-head
                    p.modal-card-title 削除したいというのは本当ですか？
                section.modal-card-body
                    p.is-size-3 {{ groupName }}
                    p.is-size-3 {{ item.key }}: {{ item.value }}
                    p.has-text-danger ※ 削除すると永遠にあなたの元に帰って来ることはありません
                footer.modal-card-foot
                    button.button.is-primary(@click="deleteItem") 削除する
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

        private isDeleteMode = false

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

        get isLink(): boolean {
            return this.item.value.indexOf('http') === 0
        }

        private deleteItem() {
            appStore.deleteItem({itemGroupName: this.groupName, itemKey: this.item.key})
            appStore.save()
            this.isDeleteMode = false
        }
    }
</script>

<style>
    .key {
        margin-top: 10px;
        display: block;
        font-weight: bold;
    }

    .delete-icon {
        color: #ff777e;
    }
</style>
