import React, { Suspense } from 'react';
import ProfileClient from './edit/profileclient';
import ProfileUser from './profileuser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Credentials from '@/models/Credentials';


export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  await connectDB()
  const user = await Credentials.findOne({email: session.user.email})
  if (!user) {
    return <ProfileClient/>
  } else {
    return <ProfileUser/>
  }
};
