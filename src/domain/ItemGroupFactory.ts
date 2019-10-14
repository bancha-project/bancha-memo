import ItemGroup from './ItemGroup'
import ItemFactory from './ItemFactory'
import Item from './Item'

export default class ItemGroupFactory {

    public static createNew(): ItemGroup {
        return {
            name: 'たった今追加されたグループ',
            items: [
                ItemFactory.createNew(),
            ],
        }
    }

    public static fromYaml(yaml: any): ItemGroup[] {
        const itemGroups: ItemGroup[] = []
        for (const groupKey of Object.keys(yaml)) {
            const groupValue = yaml[groupKey]
            const itemGroup: ItemGroup = { name: groupKey, items: [] }
            for (const itemKey of Object.keys(groupValue)) {
                const itemValue = groupValue[itemKey]
                const item: Item = { key: itemKey, value: itemValue }
                itemGroup.items.push(item)
            }
            itemGroups.push(itemGroup)
        }
        return itemGroups
    }
}
