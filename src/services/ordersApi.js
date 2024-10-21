import { BASE_URL } from "./constants";

export async function getOrders() {
    try {
        const res = await fetch(`${BASE_URL}/orders`)
        const data = await res.json()
        return await data

    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getOrderById(id) {
    try {
        const res = await fetch(`${BASE_URL}/orders/${id}`)
        const data = await res.json()
        return await data

    } catch (err) {
        console.log(err.message)

    }
}

export async function addOrder(newOrder) {
    try {
        const res = await fetch(`${BASE_URL}/orders`, {
            method: "POST",
            body: JSON.stringify(newOrder),
        })
        const data = await res.json()
        return await data

    } catch (err) {
        throw new Error(err.message)
    }
}

