// import CompanionBuilder from '@/components/form/TutorBuilder'
import HomePage from '@/components/HomePage'
import { getAllCompanions, getRecentSessions, getUserCompanions } from '@/lib/actions/aiCompanion.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

// only want to show you the form if you are sign in or created account


const page = async() => {
    const {userId}=await auth()

    if(!userId) redirect('/sign-in')

    const tutors=await getUserCompanions(userId)
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
