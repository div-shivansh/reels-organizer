import React, { Suspense } from 'react';
import ProfileClient from './profileclient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Credentials from '@/models/Credentials';
import { notFound } from 'next/navigation';

export default async function EditPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  await connectDB()
  const user = await Credentials.findOne({ email: session?.user?.email })
  if (!user) {
    return notFound()
  }

  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    < Suspense fallback={<div>Loading Profile...</div>} >
      <ProfileClient userData={plainUser} />
    </Suspense >
  )
};