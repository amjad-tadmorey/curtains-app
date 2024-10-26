import { useEffect } from "react"
import supabase from "../services/supabase"

function Settings() {

    useEffect(() => {
        async function x() {

            let { data: orders, error } = await supabase
                .from('orders').select("*")
                .eq("id", '2')
            return orders
        }
        x()
    }, [])

    return (
        <div>
            Settings
        </div>
    )
}

export default Settings
