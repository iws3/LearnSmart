import CompanionBuilder from '@/components/form/TutorBuilder'
import { newTutorsPermission } from '@/lib/actions/aiCompanion.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import FailedToCreateTutor from '../FailedToCreateTutor'

// only want to show you the form if you are sign in or created account


const page = async() => {
    const {userId}=await auth()
    if(!userId) redirect('/sign-in')
const test=false
      // check if user still have credid

      const canCreateTutor=await newTutorsPermission()
      console.log("Can create tutors is- ", canCreateTutor)
  return (
    <>
    {test ? (
      <>
    <CompanionBuilder/>
      
      </>
    ) : (

    <FailedToCreateTutor />
    )}

    </>
  )
}

export default page
