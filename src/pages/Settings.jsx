import supabase from "../services/supabase"
import { convertToIsoStringCompatible } from "../utils/helpers"

function Settings() {

    const x = convertToIsoStringCompatible("2024-10-27T08:04:44.298541+00:00")
    console.log(x);
    
    return (
        <div>
            Settings
            <button>Add Product</button>
        </div>
    )
}

export default Settings
