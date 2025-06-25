import Image from 'next/image';
import { redirect } from 'next/navigation';

import SignOut from '@/components/ui/sign-out';

import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  if (!session) redirect('/sign-in');

  return (
    <div>
      <h2> Signed in as: {session.user?.name}</h2>
      <h2>Email: {session.user?.email}</h2>
      {session.user?.image && (
        <Image src={session.user.image} alt="profile" width={150} height={160} />
      )}
      <SignOut />
    </div>
  );
}
