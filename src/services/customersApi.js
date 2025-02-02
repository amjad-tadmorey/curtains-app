import supabase from "./supabase";

export async function getCustomers() {
    const { data: customers, error } = await supabase
        .from('customers')
        .select('*')
    if (error) {
        console.log(error);
        throw new Error('Orders could not be loaded')
    }
    return customers
}

export async function getCustomerById(id) {
    const { data: customer, error } = await supabase
        .from('customers')
        .select("*")
        .eq('id', id)

    if (error) {
        console.log(error);
        throw new Error('Customer could not be loaded')
    }

    return customer[0]
}

export async function createCustomer(newCustomer) {
    const { data, error } = await supabase
        .from('customers')
        .insert([
            newCustomer,
        ])
        .select()

    if (error) {
        console.log(error);
        throw new Error('Customers could not be loaded')
    }

    return data

}

export async function updateCustomerState(id, newStatus) {

    const { data, error } = await supabase
        .from('customers')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error);
        throw new Error('could not be updated')
    }

    return data
}
