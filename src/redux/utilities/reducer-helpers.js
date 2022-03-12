export const updateItemsInArray = (items, itemID, itemKey, itemProps) => {
    return items.map(item => {
        if (item[itemKey] === item.itemID) {
            return {...item, ...itemProps}
        }
        return item
    })
}