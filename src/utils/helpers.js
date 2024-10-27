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
    if (productType === "roll") icon = "/src/assets/icons/pipe.svg"
    if (productType === "rod") icon = "/src/assets/icons/pipe.svg"
    if (productType === "rail") icon = "/src/assets/icons/pipe.svg"
    if (productType === "accessory") icon = "/src/assets/icons/pipe.svg"
    if (productType === "cleats") icon = "/src/assets/icons/hook.svg"
    if (productType === "hook") icon = "/src/assets/icons/hook.svg"
    if (productType === "oima") icon = "/src/assets/icons/pipe.svg"

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

export function getRecentSevenDays(arr) {
    // Get today's date
    const today = new Date();

    // Get the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);


    // Filter orders that were created in the last 7 days
    const recent = arr.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= sevenDaysAgo && orderDate <= today;
    });

    return recent
}

export const summarizeOrders = (orders) => {
    const result = {};

    // Define color mapping for showrooms
    const colors = {
        "tagammo": "#519DE9",
        "90-street": "#7CC674",
        "madinaty": "#C9190B",
        "nasr-city": "#EF9234",
        "shorook": "#F6D173"
    };

    orders.forEach(order => {
        const showroom = order.generalInfo.showRoom;
        const total = order.orderTotal;

        if (result[showroom]) {
            result[showroom] += total;
        } else {
            result[showroom] = total;
        }
    });

    // Return array with showroom, value, and color
    return Object.keys(result).map(showRoom => ({
        showRoom,
        // value: currencyFormatter.format(result[showRoom]),
        value: result[showRoom],
        color: colors[showRoom] || '#000000' // default color if showroom is not in the list
    }));
};

export function convertToIsoStringCompatible(dateString) {
    // Use a regular expression to match and trim microseconds
    const trimmedDateString = dateString.replace(/\.\d{3,6}(?=\+|Z|$)/, match => match.slice(0, 4));

    // Convert to a Date object and return in ISO format
    return new Date(trimmedDateString).toISOString();
}

export function getTotalOrdersByDate(orders) {
    const totalByDate = {};

    orders.forEach(order => {
        const orderDate = convertToIsoStringCompatible(order.created_at)
        const date = new Date(orderDate).toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        if (!totalByDate[date]) {
            totalByDate[date] = 0; // Initialize total for the date
        }
        totalByDate[date] += order.orderTotal; // Add order total to the respective date
    });

    // Convert the totalByDate object into an array
    return Object.entries(totalByDate).map(([time, totalOrders]) => ({
        time,
        totalOrders
    }));
}