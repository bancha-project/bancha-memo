import Item from './Item'

export default class ItemFactory {

    public static createNew(): Item {
        return {
            key: 'たった今追加されたアイテム',
            value: '',
        }
    }
}
