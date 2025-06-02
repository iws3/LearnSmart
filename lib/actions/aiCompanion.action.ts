"use server"
// send this info to the frontend to collect information to send in the db
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"

// create a learning companion
export const createCompanion = async (FormData: CreateCompanion) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from('companions')
        .insert({ ...FormData, author })
        .select();
    if (error || !data) throw Error(error?.message || "failed to create a companion")

    return data[0]

}

// fetch and display data to the all tutors page

export const getAllCompanions=async ({limit=10, page=1, subject, topic}:GetAllCompanions)=>{

    // connect our db- since we dont have a consistent connection to the server
    const supabase=createSupabaseClient();
    let query= supabase.from('companions').select();
    if(subject && topic){
        // specify the column, you wnat the likeness, and the actual pattern you are searching for...... looking for any mention of the subject within the subject
        query=query.ilike('subject',`%${subject}%`)
                    .or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    }

    // what if we only have access to the subject

    else if(subject){
        query=query.ilike('subject', `%${subject}%`)
    }
    else if(topic){
        // searching for the topic, within either the name or the topic
        query=query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    }
    // doint the pagination thing
    // first pagination-> 0 to 9 , 2nd 10 to 19 and so on
    query=query.range((page-1)*limit, page*limit-1)
    // we can then fetch data from the db base off of that query

    const {data:companions, error}=await query;
    if(error) throw new Error(error.message || "there was and error fetching the companion")
        return companions;
}

// GET one tutor

export const getCompanion=async(id:string)=>{
    const supabase=createSupabaseClient()
    const {data, error}= await supabase
                 .from('companions')
                .select()
                .eq('id', id)
    if(error) return console.log(error)
    console.log("visiting server action with: ", data[0])
    return data[0]
                
}