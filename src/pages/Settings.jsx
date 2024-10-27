import supabase from "../services/supabase"
import { convertToIsoStringCompatible } from "../utils/helpers"

function Settings() {

     function generateScheduleForSixMonths() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const schedule = [];
        const today = new Date();
        const sixMonthsFromNow = new Date(today);
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        let currentDate = new Date(today);

        while (currentDate <= sixMonthsFromNow) {
            const dayOfWeek = daysOfWeek[currentDate.getDay()];
            const dateStr = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

            schedule.push({ day: dayOfWeek, date: dateStr, boxes: 4, status: 'available' });

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return schedule;
    }

    const x = generateScheduleForSixMonths()
    console.log(x);
    
    async function handleClick() {
        const { data, error } = await supabase
            .from('schedule')
            .insert(x)
            .select()
        return data
    }

    return (
        <div>
            Settings
            <button onClick={handleClick}>Add Product</button>
        </div>
    )
}

export default Settings
