import React from 'react';

import { signOutAction } from '@/lib/actions';

import { Button } from './button';

const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant="destructive">
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutButton;
