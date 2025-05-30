import { getAllCompanions } from '@/lib/actions/aiCompanion.action';
import React from 'react'
// explore courses other people have created
// fetch companions using our server actions
// 1.Accept search params

const page = async({searchParams}:SearchParams) => {
    // getting access to search params
    // what do the params actually contains
    const params=await searchParams
    console.log('PARAMS: ', params)
    // populating our params by modifying them within the url
    // http://localhost:3000/companions?subject=math
    // or http://localhost:3000/companions?subject=math&topic=trigonometry
    // result: PARAMS:  { subject: 'math', topic: 'trigonometry' }

    const filters=await searchParams;
    const subject=filters.subject ? filters.subject : ""
    const topic=filters.topic ? filters.topic : ""
    // we can then fetch the companions uisng the server action - we created
    const aiTutors=await getAllCompanions({subject, topic})
    console.log(aiTutors)
  return (
    <div>
        EXPLORE COURSES CREATED BY OTHER PEOPLE
      
    </div>
  )
}

export default page
