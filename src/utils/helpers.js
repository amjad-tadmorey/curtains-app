export function foramtWindowObject(originObject, loopLength) {

    let num = -1
    let result = []
    Array.from({ length: loopLength }, () => 1).forEach((i) => {
        num += i
        result.push({
            material: Object.values(originObject)[num],
            width: Object.values(originObject)[num + 1]
        })
        num++
    })
    return result
}


export function renderItemIcon(productType) {
    let icon;
    if (productType === "black-out") icon = "/src/assets/icons/fabric-black.svg"
    if (productType === "light") icon = "/src/assets/icons/fabric-white.svg"
    if (productType === "havey") icon = "/src/assets/icons/fabric-black.svg"
    if (productType === "roller") icon = "/src/assets/icons/pipe.svg"
    if (productType === "accessories ") icon = "/src/assets/icons/pipe.svg"
    if (productType === "hooks") icon = "/src/assets/icons/hook.svg"
    if (productType === "oyema") icon = "/src/assets/icons/pipe.svg"

    return icon
}

export const groupByQuantity = (products) => {
    const grouped = products.reduce((result, product) => {
        const { quantity } = product;
        if (!result[quantity]) {
            result[quantity] = [];
        }
        result[quantity].push(product);
        return result;
    }, {});

    // Return each group as a separate array
    return Object.keys(grouped).map(key => grouped[key]);
};

export function generateNumberId() {
    return Math.ceil(Math.random() * 1000000000).toString()
}

export function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate
}