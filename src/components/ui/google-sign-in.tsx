import { FcGoogle } from 'react-icons/fc';

import { googleLogin } from '@/lib/actions';

import { Button } from './button';

const GoogleSignIn = () => {
  return (
    <form action={googleLogin}>
      <Button type="submit" variant="outline" className="w-full">
        <FcGoogle />
        Login with Google
      </Button>
    </form>
  );
};

export default GoogleSignIn;
