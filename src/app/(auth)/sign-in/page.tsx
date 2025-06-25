import React from 'react';

import { redirect } from 'next/navigation';

import SignInForm from '@/app/components/SignInForm';

import { auth } from '@/lib/auth';

const SignInPage = async () => {
  const session = await auth();
  console.log(session);
  if (session) redirect('/');

  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
