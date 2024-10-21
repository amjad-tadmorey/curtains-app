import { BASE_URL } from "./constants";

export async function getCustomers() {
    try {
        const res = await fetch(`${BASE_URL}/customers/`)
        const data = await res.json()
        return await data

    } catch (err) {
        console.log(err.message)

    }
}

export async function getCustomerById(id) {
    try {
        if (!id) return
        const res = await fetch(`${BASE_URL}/customers/${id}`)
        const data = await res.json()
        return await data

    } catch (err) {
        console.log(err.message)

    }
}

export async function createCustomer(newCustomer) {
    try {
        const res = await fetch(`${BASE_URL}/customers`, {
            method: "POST",
            body: JSON.stringify(newCustomer),
        })
        const data = await res.json()
        return await data

    } catch (err) {
        throw new Error(err.message)
    }
}