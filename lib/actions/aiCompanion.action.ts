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

// conversational session history
// storing our conversation into the session history
export const addToSessionHistory = async (companionId: string) => {
    if (!companionId) {
        console.error("Companion ID is required to add to session history.");
        throw new Error("Companion ID is required.");
    }
    const { userId } =await auth();
    if (!userId) {
        console.error("User not authenticated.");
        throw new Error("User not authenticated.");
    }
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
        .from('sesson_history') // Corrected table name from your example if it was 'sesson_history'
        .insert({
            companion_id: companionId,
            user_id: userId
        })
        .select() // Select the inserted row
        .single(); // Expect a single row back

    if (error) {
        console.error("Error adding to session history:", error.message);
        throw new Error(error.message);
    }
    if (!data) {
        console.error("Failed to insert session history or retrieve it.");
        throw new Error("Failed to create session history entry.");
    }
    console.log("Session history added:", data);
    return data; // Return the full session object, which includes its 'id'
}

// now fetch the session added to the  history
export const getRecentSessions=async (limit=10)=>{
    const supabase=createSupabaseClient()
    // it will be descending from newest to oldest
    const {data, error}=await supabase.from('sesson_history').select(`companions:companion_id(*)`).order('created_at', {ascending:false}).limit(limit)
    if(error)  throw new Error(error.message || "error occured while trying to get session_history")

    return data.map(({companions})=>companions)
}


// get user (or current user session)

export const getUserSessions=async (userId:string, limit=10)=>{
    const supabase=createSupabaseClient()
    // it will be descending from newest to oldest
    const {data, error}=await supabase.from('sesson_history').select(`companions:companion_id(*)`)
    .eq('user_id', userId)
    .order('created_at', {ascending:false}).limit(limit)

    if(error)  throw new Error(error.message || "error occured while trying to get session_history")

    return data.map(({companions})=>companions)
}

export const getUserCompanions=async (userId:string)=>{
    const supabase=createSupabaseClient()
    // it will be descending from newest to oldest
    const {data, error}=await supabase.from('companions').select()
    .eq('author', userId)
  
    if(error)  throw new Error(error.message || "error occured while trying to get session_history")

    return data;
}

// new tutors permission
export const newTutorsPermission=async ()=>{
    const {userId, has}=await auth()
    // check clerk doc for b2b saas apps
    // get access to the current supabase instance
    const supabase=createSupabaseClient()
    let limit=0
    if(has({plan:'pro'})){
       
       return true
    }

    else if(has({feature:"3_active_tutors"})){
        limit=3;
        
       console.log("reaching here..........2")
    }

    else if(has({feature:"10_active_tutors"})){
        limit=5;
        
       console.log("reaching here.......... 3")
    }
console.log("final limit is : ", limit )
    // get amount of companions user has created:

    const {data, error}=await supabase.from("companions").select('id', {count:'exact'}).eq('author', userId)

    if(error) throw new Error(error.message)
    // get access to the companion count
const tutorsCount=data?.length
console.log("tutors count is: ", tutorsCount)

if(tutorsCount >=limit){
    console.log("its okay")
    return false
}

else{
    return true
    console.log("reaching here instead")
}

}