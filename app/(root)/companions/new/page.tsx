import CompanionBuilder from '@/components/form/TutorBuilder'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

// only want to show you the form if you are sign in or created account


const page = async() => {
    const {userId}=await auth()
    if(!userId) redirect('/sign-in')
  return (
    <>
    <CompanionBuilder/>
    </>
  )
}

export default page
