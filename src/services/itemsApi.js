import { BASE_URL } from "./constants";

export async function getItems() {
    try {
        const res = await fetch(`${BASE_URL}/items`)
        const data = await res.json()
        return await data

    } catch (err) {
        throw new Error(err.message)
    }
}

export async function getItemById(id) {
    try {
        if (!id) return
        const res = await fetch(`${BASE_URL}/items/${id}`)
        const data = await res.json()
        return await data

    } catch (err) {
        throw new Error(err.message)
    }
}

export async function createItem(newItem) {
    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: "POST",
            body: JSON.stringify(newItem),
        })
        const data = await res.json()
        return await data

    } catch (err) {
        throw new Error(err.message)
    }
}