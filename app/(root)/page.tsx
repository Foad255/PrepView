import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'



const page = () => {
  return (
   <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview</h2>
          <p className='text-lg'>Practice</p>
          <Button asChild className="btn-primary max-sm:2-full">
            <Link href="/interview">Start an  Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />
      </section>


      {/* My interviews */}
      <section className="flex flex-col gap-6 mt-8"
      >
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
        {/* <p>You haven&apos;t taken any interviews yet.</p> */}

      </section>

      {/* Take an Interview */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">

          <p>There are no interviews available</p>
        </div>
      </section>
   </>
  )
}

export default page
