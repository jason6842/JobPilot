import { FaGithub } from 'react-icons/fa';

import { githubLogin } from '@/lib/actions';

import { Button } from './button';

const GithubSignIn = () => {
  return (
    <form action={githubLogin}>
      <Button type="submit" variant="outline" className="w-full">
        <FaGithub />
        Login with GitHub
      </Button>
    </form>
  );
};

export default GithubSignIn;
