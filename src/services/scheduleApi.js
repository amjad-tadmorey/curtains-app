import supabase from "./supabase";


export async function getSchedule() {

    const { data: schedule, error } = await supabase
        .from('schedule')
        .select('*')
    if (error) {
        console.log(error);
        throw new Error('schedule could not be loaded')
    }
    return schedule

}

export async function updateSchedule(dayDate, updatedDay) {
    console.log(dayDate);
    console.log(updatedDay);

    const { data, error } = await supabase
        .from('schedule')
        .update({ ...updatedDay })
        .eq('date', dayDate)
        .single()
    if (error) {
        console.log(error);
        throw new Error('schedule could not be updated')
    }
    return data
}