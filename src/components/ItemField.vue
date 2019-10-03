<template lang="pug">
    .field
        label.label.ml-10.mt-20 {{ item.key }}
        .control
            .is-inline-block
                font-awesome-icon.hover-grey(
                    icon="copy" @click="() => { copy(item.value) }" size="lg" :id="id")
            .is-inline-block.ml-10(style="width:80%")
                input.input(type="text" :value="item.value" readonly)
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { appStore } from '@/store'
    import anime from 'animejs'
    import Item from '@/domain/Item'
    import crypto from 'crypto'

    @Component
    export default class ItemField extends Vue {

        @Prop() private readonly groupName!: string

        @Prop() private readonly item!: Item

        private copy(s: string) {
            anime({
                targets: '#' + this.id,
                scale: 2,
                translateX: 10,
                translateY: 10,
                rotate: [0, 3600],
                direction: 'alternate',
                duration: 300,
                easing: 'easeInOutSine',
            })
            appStore.copy(s)
        }

        get id(): string {
            const hash =  crypto.createHash('md5')
            hash.update(this.groupName + this.item.key)
            const digest = `${hash.digest('hex')}`
            return 'copy-icon-' + digest.substring(0, 8)
        }
    }
</script>
