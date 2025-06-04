import CompanionBuilder from '@/components/form/TutorBuilder'
import { newTutorsPermission } from '@/lib/actions/aiCompanion.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

// only want to show you the form if you are sign in or created account


const page = async() => {
    const {userId}=await auth()
    if(!userId) redirect('/sign-in')

      // check if user still have credid

      const canCreateTutor=await newTutorsPermission()
      console.log("Can create tutors is- ", canCreateTutor)
  return (
    <>
    {canCreateTutor ? (
      <>
    <CompanionBuilder/>
      
      </>
    ) : (

      <article>
        {/* create a very nice page for tutors limit, please sunxcribe for more tutors  */}
        {/* <CompanionLimit/> */}
        <div className='flex items-center justify-center w-full h-screen'>
          Out of credids, subscribe to create more companions
        </div>
      </article>
    )}

    </>
  )
}

export default page
