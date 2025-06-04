// import CompanionBuilder from '@/components/form/TutorBuilder'
import HomePage from '@/components/HomePage'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/aiCompanion.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

// only want to show you the form if you are sign in or created account


const page = async() => {
    const {userId}=await auth()

    if(!userId) redirect('/sign-in')

    const tutors=await getAllCompanions({limit:8})
    console.log("here is the list of tutors data: ", tutors)

    const recentSessionTutors=await getRecentSessions()

    console.log("here is the recent tutoring sessions data: ", recentSessionTutors)
  return (
    <>
    <HomePage
    tutors={tutors}
    recentSessions={recentSessionTutors}

    />
    </>
  )
}

export default page
