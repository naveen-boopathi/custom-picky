export const findTotalCount = (options, key) => {
    let count = 0
    options.forEach(eachOption => {
        count = count + eachOption[key].length
    })
    return count
}
export const generateFlags = (options, selectedItems, label) => {
    const totalCount = findTotalCount(options, label)
    const updatedOptions = options.map((eachOption) => {
        const length = eachOption.lteCoin.length
        let count = 0
        const updatedItems = eachOption.lteCoin.map((eachItem) => {
            if (selectedItems.indexOf(eachItem) !== -1) {
                return { item: eachItem, checked: true }
            } else {
                return { item: eachItem, checked: false }
            }
        })
        updatedItems.forEach((eachItem) => {
            if (eachItem.checked) {
                count = count + 1
            }
        })
        if (count === length) {
            return { ...eachOption, allSelected: 'all', lteCoin: updatedItems }
        } else if (count === 0) {
            return { ...eachOption, allSelected: 'none', lteCoin: updatedItems }
        } else {
            return { ...eachOption, allSelected: 'partial', lteCoin: updatedItems }
        }
    })
    return { updatedOptions, totalCount }
}